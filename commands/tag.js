const Discord = require("discord.js");
module.exports = {
  description: "Manages and calls on tags.",
  aliases: ["t", "snippet"],
  usage: "<create/edit/delete/info/list/name> <[name]> <[text]>",
};
module.exports.run = async (client, message, args) => {
  let prefix = process.env.prefix;
  let embed = new Discord.MessageEmbed();
  let manageTagRoleId = `412791520316358656`; // Helpers Role ID
  let usage = args[0];
  if (!usage) {
    embed.setColor(client.colors.blue);
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
    embed.setDescription(
      `\`${prefix}tag create <name> <text>\`\n\`${prefix}tag delete <name>\`\n\`${prefix}tag edit <name> <text>\`\n\`${prefix}tag list\`\n\`${prefix}tag alias <name> <alias>\`\n\`${prefix}tag info <name>\``
    );
    return message.channel.send(embed);
  }
  usage = usage.toLowerCase();
  if (usage === "create" || usage === "new") {
    if (!message.member.roles.cache.has(manageTagRoleId))
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send(
          `You do not have permission to create tags.`
        );
      }
    let name = args[1];
    let text = args.slice(2).join(" ");
    if (!name || !text) {
      return message.channel.send(`Missing the tag name or text argument.`);
    }
    name = name.toLowerCase();
    const currentTag = await client.tagdb.findOne({
      where: {
        name: name, //,
        // guildid: message.guild.id
      },
    });
    if (currentTag) {
      return message.channel.send(`That tag already exists.`);
    }
    client.tagdb.create({
      name: name,
      creatorid: message.author.id,
      text: text, //,
      // guildid: message.guild.id
    });
    return message.channel.send(`Tag created!`);
  } else if (usage === "edit" || usage === "modify") {
    if (!message.member.roles.cache.has(manageTagRoleId))
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send(
          `You do not have permission to manage tags.`
        );
      }
    let name = args[1];
    let text = args.slice(2).join(" ");
    if (!name || !text) {
      return message.channel.send(`Missing the tag name or text argument.`);
    }
    name = name.toLowerCase();
    let oldTag;
    let rowsAffected;
    try {
      oldTag = await client.tagdb.findOne({
        where: {
          name: name, //,
          // guildid: message.guild.id
        },
      });
      if (!oldTag) {
        return message.channel.send(`That tag does not exist.`);
      }
      rowsAffected = await client.tagdb.update(
        {
          text: text,
        },
        {
          where: {
            name: name, //,
            // guildid: message.guild.id
          },
        }
      );
      if (rowsAffected < 0) {
        return message.channel.send(`No edits were made.`);
      }
    } catch (err) {
      return message.channel.send(`An unexpected error has occured.`);
    }
    return message.channel.send(`Tag edited.`);
  } else if (usage === "alias" || usage === "aliases") {
    if (!message.member.roles.cache.has(manageTagRoleId))
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send(
          `You do not have permission to manage tags.`
        );
      }
    let name = args[1];
    let text = args.slice(2).join(" ");
    if (!name || !text) {
      return message.channel.send(`Missing the tag name or aliases argument.`);
    }
    name = name.toLowerCase();
    let oldTag;
    let rowsAffected;
    try {
      oldTag = await client.tagdb.findOne({
        where: {
          name: name,
        },
      });
      if (!oldTag) {
        return message.channel.send(`That tag does not exist.`);
      }
      rowsAffected = await client.tagdb.update(
        {
          aliases: text,
        },
        {
          where: {
            name: name,
          },
        }
      );
      if (rowsAffected < 0) {
        return message.channel.send(`No edits were made.`);
      }
    } catch (err) {
      console.log(err);
      return message.channel.send(`An unexpected error has occured.`);
    }
    return message.channel.send(`Tag edited.`);
  } else if (usage === "remove" || usage === "delete") {
    if (!message.member.roles.cache.has(manageTagRoleId))
      if (!message.member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send(
          `You do not have permission to manage tags.`
        );
      }
    let name = args[1];
    if (!name) {
      return message.channel.send(`Missing the tag name argument.`);
    }
    name = name.toLowerCase();
    let beforeTag;
    try {
      beforeTag = await client.tagdb.findOne({
        where: {
          name: name,
        },
      });
      if (!beforeTag) {
        return message.channel.send(`That tag does not exist.`);
      }
      const rowCount = await client.tagdb.destroy({
        where: {
          name: name,
        },
      });
    } catch (err) {
      return message.channel.send(`An unexpected error has occured.`);
    }
    return message.channel.send(`Tag deleted.`);
  } else if (usage === "info" || usage === "details") {
    let name = args[1];
    if (!name) {
      return message.channel.send(`Missing the tag name argument.`);
    }
    name = name.toLowerCase();
    const tag = await client.tagdb.findOne({
      where: {
        name: name,
      },
    });
    if (!tag) {
      return message.channel.send(`That tag does not exist.`);
    }
    embed.setColor(client.colors.blue);
    embed.setTitle(`Tag Info: ${tag.name}`);
    embed.setDescription(
      `Created by: <@${tag.creatorid}>\nUses: ${tag.uses}\nAliases: \`${tag.aliases}\`\nCreated: ${tag.createdAt}\nUpdated: ${tag.updatedAt}`
    );
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
    return message.channel.send(embed);
  } else if (usage === "list" || usage === "all") {
    let tags = await client.tagdb.findAll({
      attributes: ["name"],
      where: {
        // guildid: message.guild.id
      },
    });
    let taglist =
      tags.map((tag) => tag.name).join(", ") || "There are currently no tags.";
    let embed = new Discord.MessageEmbed();
    embed.setColor(client.colors.blue);
    embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
    embed.setDescription(taglist);
    embed.setTitle(`📋 Listing all tags:`);
    return message.channel.send(embed);
  } else {
    let name = args[0];
    if (!name) {
      return message.channel.send(`That tag does not exist.`);
    }
    name = name.toLowerCase();
    let tag = await client.tagdb.findOne({
      where: {
        name: name,
      },
    });
    if (tag) {
      tag.increment("uses");
      let tagmsg = await message.channel.send(tag.text);
      message.delete()
      if (args[1]) {
        const text = args.slice(1).join(" ")
      return tagmsg.edit(text + " " + tag.text);
      } return;
    }

    let tags = await client.tagdb.findOne({
      // attributes: ["aliases"],
      where: {
        aliases: name,
      },
    });

    if (!tags) {
      let msg = await message.channel.send(`That tag does not exist.`);
      message.delete({ timeout: 1000 });
      return msg.delete({ timeout: 1500 });
    }
    tags.increment("uses");
    let tagmsg = await message.channel.send(tags.text);
    message.delete();
    if (args[1]) {
    const text = args.slice(1).join(" ")
    return tagmsg.edit(text + " " + tags.text);
    }
  }
};