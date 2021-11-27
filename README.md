# Homura

Homura is the backend for a software, which enables us to listen to music together!

Major functionalities:

- As a server, serve a single-page website.
	- Music player. (`Listener`)
	- Operation sync. (`Listener`)
	- Simple terminal-like environment to call APIs. (`Operator`)
- As a server, provide APIs for clients to call.
	- Operations that can modify music list, etc.
	- Maintain state for each (although there is probably only one) music room.
	- Operation sync with all client `Listener`s.
- As a client `Operator`, listen to wechat message and call APIs if necessary.
