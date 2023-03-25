
export function getHeaders(){
    return {
        'Authorization': localStorage.getItem("idToken"),
        'Content-Type': 'application/json'
    }
}