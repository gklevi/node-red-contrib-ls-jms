# node-red-contrib-ls-jms

This projects contributes nodes to Node-Red (https://nodered.org/) to send and receive JMS messages by leveraging the lightstreamer jms extender (https://lightstreamer.com/ls-jms-features).
While lightstreamer jms extender does the heavy work to actually perform JMS communication, this project bridges this communication into the node-red context by providing
- an input node that receives JMS messages
- an output node that sends JMS messages
- a configuration node to setup the communication


## Installation

If you have installed Node-RED as a global node.js package (you use the command node-red anywhere to start it), 
you need to install node-red-contrib-ls-jms as a global package as well.

```
npm install -g node-red-contrib-ls-jms
```
If you have a local node.js project, then you may install it as a local packages

```
npm install node-red-contrib-ls-jms --save
```


## Usage

After installing node-red-contrib-ls-jms there are new nodes in the palette labelled with 'ls jms'. An input node for receiving jms messages. 
An output node for sending jms messages. 

![ls-jms-in-node](/images/ls-jms-in.png "ls-jms input node")

![ls-jms-out-node](/images/ls-jms-out.png "ls-jms input node")

Drag and drop them oonto the canvas of the node-red-editor as any other nodes. Configrue these nodes by double-clicking. 
For both nodes you can set a name, the destination type (queue or topic), the name of the destination and the lightstreamer jms configuration node.

![ls-jms-in-node-config](/images/ls-jms-in-config.png "ls-jms input node configuration")

The configuration node configures the reference to the lightstreamer jms extender. 
The lightstreamer jms extender has a configuration of its own for accessing jms brokers (refer to the lightstreamer jms extender documentation).
In the configuration node you set the url of the lightstreamer jms extender and the name of the adapter in the lightreamer jms extender configuration file

![ls-jms-config-node](/images/config-node.png "ls-jms config node")


## Release History

* 0.1.0 Initial release

## License

The MIT License (MIT)

Copyright (c) 2014 gklevi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
