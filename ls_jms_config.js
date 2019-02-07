module.exports = function(RED) {
    function LsJmsConfig(config) {
        RED.nodes.createNode(this, config);
		
		// Get config
		this.lightstreamerUrl = config.lightstreamerUrl || "http://localhost:8080/";
		this.cfgName = config.cfgName || "Weblogic"
		this.cfgCF = config.cfgCF || "CRCF"
    }
    RED.nodes.registerType("ls-jms-config", LsJmsConfig);
}
