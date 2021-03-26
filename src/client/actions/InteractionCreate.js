'use strict';

const Action = require('./Action');
const { Events } = require('../../util/Constants');
const SnowflakeUtil = require('../../util/Snowflake');

const parseContent = options => {
  let content = '';
  options.forEach(element => (content += element.value));
  return content;
};

class InteractionCreateAction extends Action {
  async handle(data) {
    const client = this.client;
    const guild = client.guilds.cache.get(data.guild_id);
    const interaction = {
      id: data.id,
      token: data.token,
      channel: client.channels.cache.get(data.channel_id),
      guild: guild,
      member: guild ? guild.members.cache.get(data.member.user.id) || (await guild.members.fetch(data.member.user.id)) || null : null,
      author: client.users.cache.get(data.member.user.id) || (await client.users.fetch(data.member.user.id)) || null,
      name: data.data.name,
      content: data.data.options ? parseContent(data.data.options) : "",
      createdTimestamp: SnowflakeUtil.deconstruct(data.id).timestamp,
      options: data.data.options ? data.data.options : null,
      reply (input) {
       client.api.interactions(interaction.id, interaction.token).callback.post({data: {
          type: 4,
          data: {
    content: 'content'
  }
  }
};
}})
      }
}})
    };
    client.emit(Events.INTERACTION_CREATE, interaction);
    return { interaction };
  }
}
module.exports = InteractionCreateAction;
