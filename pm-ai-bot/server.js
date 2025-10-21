require('dotenv').config();
const { App } = require('@slack/bolt');
const OpenAI = require('openai');
const { PROJECT_CONTEXT, PM_AI_CAPABILITIES, CURSOR_PROMPT_TEMPLATES } = require('./project-context.js');

// 🤖 Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 💬 Initialize Slack Bot
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

// 🎯 PM AI Personality & Instructions
const PM_SYSTEM_PROMPT = `${PM_AI_CAPABILITIES}

You are "PM AI" - an expert AI Product Manager assistant with deep knowledge of the Dashboard Application project.

Current Project: ${PROJECT_CONTEXT.project.name}
Project Type: ${PROJECT_CONTEXT.project.type}
Tech Stack: ${PROJECT_CONTEXT.technologies.frontend.framework} + ${PROJECT_CONTEXT.technologies.frontend.language}
Design System: CSS Variables with ${PROJECT_CONTEXT.designSystem.components.length} components

When responding:
- Be concise but thorough
- Provide actionable recommendations
- Use emojis sparingly for clarity (✅, 🚀, ⚠️, 📋)
- Reference specific project features when relevant
- Respond in Hebrew or English based on user's language
- Use your knowledge of the project to give relevant advice`;

// 📝 Store conversation context (in-memory for now)
const conversationHistory = {};

// 🎤 Listen to mentions and direct messages
app.event('app_mention', async ({ event, say, client }) => {
  try {
    const userId = event.user;
    const text = event.text.replace(/<@[A-Z0-9]+>/g, '').trim();
    const channel = event.channel;

    // Initialize conversation history
    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    // Add user message
    conversationHistory[userId].push({
      role: 'user',
      content: text
    });

    // Keep only last 10 messages
    if (conversationHistory[userId].length > 10) {
      conversationHistory[userId] = conversationHistory[userId].slice(-10);
    }

    // Show typing indicator
    await client.chat.postMessage({
      channel: channel,
      text: '💭 חושב...'
    });

    // Get AI response
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: PM_SYSTEM_PROMPT },
        ...conversationHistory[userId]
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;

    // Add AI response to history
    conversationHistory[userId].push({
      role: 'assistant',
      content: aiResponse
    });

    // Send response
    await say({
      text: aiResponse,
      thread_ts: event.ts
    });

  } catch (error) {
    console.error('Error:', error);
    await say({
      text: '❌ סליחה, קרתה שגיאה. בוא ננסה שוב?',
      thread_ts: event.ts
    });
  }
});

// 💬 Listen to direct messages
app.event('message', async ({ event, say }) => {
  if (event.subtype === 'bot_message' || event.thread_ts) return;
  if (event.channel_type !== 'im') return;

  try {
    const userId = event.user;
    const text = event.text;

    if (!conversationHistory[userId]) {
      conversationHistory[userId] = [];
    }

    conversationHistory[userId].push({
      role: 'user',
      content: text
    });

    if (conversationHistory[userId].length > 10) {
      conversationHistory[userId] = conversationHistory[userId].slice(-10);
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: PM_SYSTEM_PROMPT },
        ...conversationHistory[userId]
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const aiResponse = completion.choices[0].message.content;

    conversationHistory[userId].push({
      role: 'assistant',
      content: aiResponse
    });

    await say(aiResponse);

  } catch (error) {
    console.error('Error:', error);
    await say('❌ סליחה, קרתה שגיאה.');
  }
});

// 🎯 Slash Commands
app.command('/pm-status', async ({ command, ack, say }) => {
  await ack();
  await say({
    text: `📊 *PM AI Status*\n\n✅ Bot is running\n🤖 AI Model: GPT-4\n💬 Active conversations: ${Object.keys(conversationHistory).length}\n\nType \`/pm-help\` for available commands.`
  });
});

app.command('/pm-help', async ({ command, ack, say }) => {
  await ack();
  await say({
    text: `🤖 *PM AI Help*\n\n*How to use:*\n• Mention me: @PM AI [question]\n• Send me a DM\n• Use commands:\n\n*Commands:*\n• \`/pm-status\` - Bot status\n• \`/pm-help\` - This help\n\nI'm here to help! 🚀`
  });
});

// 🚀 Start the bot
(async () => {
  await app.start();
  console.log('⚡️ PM AI Bot is running!');
  console.log('🤖 Ready to help!');
})();