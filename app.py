import asyncio
import os
from datetime import datetime, timedelta

import openai
from dotenv import load_dotenv
from flask import Flask, request
from pyrogram import Client

load_dotenv()

api_id = os.environ["TELEGRAM_API_ID"]
api_hash = os.environ["TELEGRAM_API_HASH"]
openai.api_key = os.environ["OPENAI_API_KEY"]
app = Flask(__name__)

client = Client(name="")


@app.route("/", methods=["GET", "POST"])
def welcome():
    return "home"


# This is an async function that sends a code request and waits for the user to enter it
async def send_code_and_wait(phone_number):
    client = Client(
        name=str(phone_number),
        api_id=api_id,
        api_hash=api_hash,
        phone_number=phone_number,
    )
    await client.start()
    # Here you could possibly listen for the code or ask the user to enter it in your web app


@app.route("/verify_phone", methods=["POST"])
def verify_phone():
    phone_number = request.form.get("phone_number")
    # As the telethon functions are asynchronous and Flask route functions are synchronous,
    # We have to run the asynchronous function in the event loop
    asyncio.run(send_code_and_wait(phone_number))

    # You may want to implement a way to return whether the process was successful or not.
    # For the purpose of this example, it is just returning a simple JSON response.
    return {"message": "Phone number verification process initiated."}


@app.route("/get_users")
async def get_users():
    session_name = request.args.get("session_name", default="my_account")
    # async def get_chats_async():
    api_id = os.environ["TELEGRAM_API_ID"]
    api_hash = os.environ["TELEGRAM_API_HASH"]
    users = []
    telegramClient = Client(session_name, api_id=api_id, api_hash=api_hash)
    async with telegramClient as client:
        async for dialog in client.get_dialogs():
            if dialog.chat.username == None:
                continue

            chat_id = dialog.chat.id

            # Calculate the timestamps for the previous day
            # today = datetime.utcnow().date()
            # previous_day = today - timedelta(days=1)
            # previous_day_start = datetime.combine(previous_day, datetime.min.time())
            yesterday = datetime.utcnow() - timedelta(days=1)

            # Get the messages within the specified time range
            messages = client.get_chat_history(
                chat_id=chat_id,
                limit=0,
                offset_date=yesterday,
            )

            # Count the number of messages
            message_count = 0
            attachments = 0
            async for message in messages:
                message_count += 1
                if message.media:
                    attachments += 1

            unread_messages = dialog.unread_messages_count

            # attachment = await client.get_chat_photos_count(chat_id=chat_id)

            detail = {
                "chatName": dialog.chat.title,
                "userName": dialog.chat.username,
                "chatID": chat_id,
                "totalMessages": message_count,
                "unreadMessages": unread_messages,
                "attachment": attachments,
            }

            users.append(detail)
        print("users: ", users)
    return users


# @app.route("/get_user")
# async def get_user():
#     session_name = request.args.get("session_name", default="yugam")
#     client.get_chat_
#     asyncio.run(count_messages())
#     user = {"total_messages": 0, "unread": 0, "attachments": 0}

#     # asyncio.run(count_messages('chat_id'))

#     return user


# Input: username, session_name
# Process
# We need get the chat
# Filter for 1 day
# Feed into openai
# get_response and return json
@app.route("/get_chat_summary")
async def get_chat_summary():
    session_name = request.args.get("session_name", default="my_account")
    chat_id = "@" + request.args.get("username", default="cdevadhar")
    text = ""
    telegramClient = Client(session_name, api_id=api_id, api_hash=api_hash)
    async with telegramClient as client:
        yesterday = datetime.utcnow() - timedelta(days=1)
        async for message in client.get_chat_history(chat_id):
            if message.date > yesterday:
                text += f"\n {message.text}"
                print(f"From: {message.chat.id}\n{message.text}\n\n")
    if text == "":
        return "No messages in the past 24 hours!"
    # Define the system message to instruct the model
    system_message = "You are a helpful assistant that summarizes human conversations. Please read the messages below and provide a concise summary. Ignore any terms, policies, or non-human conversation."
    # Define the prompt to summarize the chat history
    prompt = "Summarize the chat history from the past day, keep it short and simple, give BULLET points! Be specific and keep details! Remember to not skip details, and use as much language from the text as possible instead of introducing more words! One mention things that are part of the conversation."
    # Concatenate the system message, prompt, and the chat history
    full_text = f"{system_message}\n{prompt}\n{text}"
    # Make an API call to the OpenAI GPT-3.5 Turbo model using the v1/chat/completions endpoint
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": full_text},
        ],
        max_tokens=60,
    )
    # Extract the generated summary from the response
    summary = response.choices[0].message["content"].strip()
    return summary


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8484)
