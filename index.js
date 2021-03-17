// Import modules
const Discord = require("discord.js");
// const client = new Discord.Client();
const chalk = require("chalk");
const figlet = require("figlet");
const fs = require("fs");
const fetch = require("node-fetch");
// const config = require("./config.js");
require("dotenv").config();
const colors = require("./colors.js");
// const tools = require("./tools.js");
const cooldowns = new Discord.Collection();

const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler  } = require('discord-akairo');

class MyClient extends AkairoClient {
    constructor() {
        super({
          ownerID: '176490509852737537',// Options for Akairo go here.
        }, {
            // Options for discord.js goes here.
        });
        this.commandHandler = new CommandHandler(this, {
          directory: './commands/',
          prefix: process.env.prefix, // or ['?', '!']
          aliasReplacement: /-/g,
          allowMention: true,
          handleEdits: true,
          commandUtil: true,
          argumentDefaults: {
            prompt: {
                timeout: 'Command timeout. Prompt cancelled.',
                ended: 'Too many retries. Prompt cancelled.',
                cancel: 'Prompt cancelled.',
                retries: 1,
                time: 30000
            }
           // Options for the command handler goes here.
        }});
      this.listenerHandler = new ListenerHandler(this, {
        directory: './listeners/'
    });
    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: './inhibitors/'
  });
  this.listenerHandler.setEmitters({
    commandHandler: this.commandHandler,
    inhibitorHandler: this.inhibitorHandler,
    listenerHandler: this.listenerHandler
});
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
    this.inhibitorHandler.loadAll();
    this.commandHandler.loadAll();
    this.listenerHandler.loadAll();
    }
    
}


const client = new MyClient();

// Setup databases
const Keyv = require("keyv");
const keyv = new Keyv("sqlite://.data/db.sqlite");
client.keyv = keyv;

const Sequelize = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ".data/tagdb.sqlite",
  logging: false,
});

const tagdb = sequelize.define("tags", {
  name: {
    type: Sequelize.STRING,
  },
  creatorid: Sequelize.TEXT,
  text: Sequelize.TEXT,
  uses: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  aliases: {
    type: Sequelize.STRING,
  },
});
tagdb.sync();
client.tagdb = tagdb;

client.login(process.env.token);
