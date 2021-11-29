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
