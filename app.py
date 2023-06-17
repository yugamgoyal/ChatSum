from flask import Flask, request
from pyrogram import Client
app = Flask(__name__)
@app.route("/", methods=["GET", "POST"])
def welcome():
    return "home"
@app.route("/get_chats")
async def get_chats():
    session_name = request.args.get("session_name", default="yugam")
    # async def get_chats_async():
    api_id = "26190868"
    api_hash = "96ff07a01c9d172f99c9c4642b29753c"
    users = []
    async with Client(session_name, api_id=api_id, api_hash=api_hash) as client:
        async for dialog in client.get_dialogs():
            if (dialog.chat.username == None):
                continue
            detail = {
                "chatName": dialog.chat.title,
                "userName": dialog.chat.username
            }
            users.append(detail)
        print("users: ", users)
    return users

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8484)