var jms = require('lightstreamer-jms-client')

module.exports = function(RED) {
    function LsJmsIn(config) {
        RED.nodes.createNode(this, config);
        var node = this;
		node.log(JSON.stringify(config))

		
		// Get config
		var lightstreamerUrl = "t3://localhost:8080";
		var cfgName = "WebLogic"
		var connectionFactoryName= "CRCF"
		var destinationType = config.destinationType || "Topic";
		var destination = config.destination || "stocksTopic";
		
		this.lightstreamerJmsConfig = RED.nodes.getNode(config.lightstreamerJmsConfig);
		
        if (this.lightstreamerJmsConfig) {
			lightstreamerUrl = this.lightstreamerJmsConfig.lightstreamerUrl;
			cfgName = this.lightstreamerJmsConfig.cfgName;
			connectionFactoryName= this.lightstreamerJmsConfig.cfgCF;
        } 
		
		// var jms = global.get('jms');
		node.connection = null;
		jms.ConnectionFactory.createConnection(lightstreamerUrl, cfgName, null, null, {
			onConnectionCreated: function(conn) {
			  node.connection = conn;

			  // Connection succeeded, dest subscription
			  var session= conn.createSession(false, "AUTO_ACK");
	
			  var dest = destinationType == "Topic" ? session.createTopic(destination) : session.createQueue(destination);
			  var consumer= session.createConsumer(dest, null);

			  // Add listener to message consumer
			  consumer.setMessageListener({
				onMessage: function(message) {
					
				  node.log("ls-jms-in: Message received in ls-jms: " + message.getText())
				  node.send({payload: message.getText()});
				}
			  });
			  node.log("start");
			  // Start the connection
			  conn.start();
			  
			  node.status({fill:"green", shape:"dot", text:"connected"});

			},
			onConnectionFailed: function(errorCode, errorMessage) {

			  // Connection failed, show the error
			  node.log("ls-jms-in: Error: " + errorCode + " " + errorMessage);
			  node.status({fill:"red", shape:"ring", text:"connection failed"});

			},
			onLSClient: function(lsClient) {

			  // Add connection status logging (optional)
			  lsClient.addListener({
				onStatusChange: function(newStatus) {
				  node.log('ls-jms-in: ' + newStatus);
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
		
        node.on('close', function(done) {
			var connection = node.connection;
			if (connection) {
				connection.close(); 
				connection = null;
				done();
			}
        });
    }
    RED.nodes.registerType("ls-jms-in", LsJmsIn);
}
