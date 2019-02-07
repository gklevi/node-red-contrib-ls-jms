var jms = require('lightstreamer-jms-client')

module.exports = function(RED) {
    function LsJmsOut(config) {
        RED.nodes.createNode(this, config);
        var node = this;
		node.log(JSON.stringify(config))
		
		// Get config
		var lightstreamerUrl = "t3://localhost:8080";
		var cfgName = "WebLogic"
		var destinationType = config.destinationType || "Topic";
		var destination = config.destination || "stocksTopic";
		
		this.lightstreamerJmsConfig = RED.nodes.getNode(config.lightstreamerJmsConfig);
		
        if (this.lightstreamerJmsConfig) {
			lightstreamerUrl = this.lightstreamerJmsConfig.lightstreamerUrl;
			cfgName = this.lightstreamerJmsConfig.cfgName;
        } 
		
		// var jms = global.get('jms');
		node.connection = null;
		jms.ConnectionFactory.createConnection(lightstreamerUrl, cfgName, null, null, {
			onConnectionCreated: function(conn) {

			  // Connection succeeded, dest subscription
			  var session = conn.createSession(false, "AUTO_ACK");
		  
			  var dest = destinationType == "Topic" ? session.createTopic(destination) : session.createQueue(destination);
			  var producer = session.createProducer(dest, null);

			  // Start the connection
			  conn.start();
			  
			  node.status({fill:"green", shape:"dot", text:"connected"});
			  node.connection = conn;
			  node.session = session;
			  node.producer = producer;
			},
			
			onConnectionFailed: function(errorCode, errorMessage) {

			  // Connection failed, show the error
			  node.log("ls-jms-out: Error: " + errorCode + " " + errorMessage);
			  node.status({fill:"red", shape:"ring", text:"connection failed"});

			},
			
			onLSClient: function(lsClient) {

			  // Add connection status logging (optional)
			  lsClient.addListener({
				onStatusChange: function(newStatus) {
				  node.log('ls-jms-out: ' + newStatus);
				  if (newStatus.startsWith('CONNECTING')) {
					node.status({fill:"green", shape:"ring", text:"connected"});
					  
				  }					  
				  if (newStatus.startsWith('CONNECTED')) {
					node.status({fill:"green", shape:"dot", text:"connected"});
					  
				  }					  
				  if (newStatus.startsWith('DISCONNECTED')) {
					node.status({fill:"red", shape:"ring", text:"disconnected"});
					  
				  }					  
				}
			  });
			}
		});
		
		node.on('input', function(msg) {
			var message = node.session.createTextMessage(msg.payload);
			if(msg.properties) {
				for (var prop in msg.properties) {
					if (msg.properties.hasOwnProperty(prop)) {
						message.setObjectProperty(prop, msg.properties[prop])
					}
				}
			}
			node.producer.send(message);
			node.log('ls-jms-out: ' + "message sent: " + msg.payload);
		});
		
        node.on('close', function(done) {
			var connection = node.connection;
			if (connection) {
				connection.close(); 
				connection = null;
				done();
			}
        });
    }
    RED.nodes.registerType("ls-jms-out", LsJmsOut);
}
