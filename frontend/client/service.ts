import axios from "axios";
import socket from "./socket";

export async function login() {
    return {
        _id: "01",
        userName: "user01",
    };
}

export async function getEntries() {
    return [
        {
            _id: "001",
            categoryId: "001",
            name: "001",
            amount: 1,
            createTime: "001",
        },
        {
            _id: "001",
            categoryId: "001",
            name: "001",
            amount: 1,
            createTime: "001",
        },
        {
            _id: "001",
            categoryId: "001",
            name: "001",
            amount: 1,
            createTime: "001",
        },
    ]
}

export async function addEntry() {
    return "002";
}

export async function setCookie(cookie: string) {
    try {
        const [errcode] = await axios.post("/api/setCookie", {data: cookie});
        console.log(errcode)
        return errcode == 0;
    } catch (e) {
        console.log(e);
        return false;
    }
}

export async function joinRoom(userName: string, roomName: string) {
    const joinProm = new Promise((resolve, reject) => {
        try {
            socket.emit("join", userName, roomName, (response: unknown) => {
                resolve(response);
            })
        } catch (e) {
            reject(e);
        }
    });

    try {
        const res = await joinProm;
        // @ts-ignore
        console.log(res.errcode)
    } catch (e) {
        console.log(e);
    }
}

export async function searchByKey(key: string) {
    try {
        return await axios.post("/api/search", {key: key});
    } catch (e) {
        console.log(e)
        return {};
    }
}

export async function addSong(nickname: string, roomname: string, songmid: string, mediamid: string) {
    try {
        let res = await axios.post("/api/add", {
            nick: nickname,
            name: roomname,
            songmid: songmid,
            mediamid: mediamid,
        });
        return res.data.errcode == 0;
    }
    catch(e) {
        console.log(e);
        return false;
    }
}
