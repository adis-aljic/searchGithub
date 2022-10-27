const search_user = document.getElementById("search_username_btn")
const input_username = document.getElementById("search_username")

const input_username_form = document.getElementById("input_username")
const results_username = document.getElementById("results_username")
results_username.classList.add("hidden")
document.getElementById("all_results").classList.add("hidden")
const username = input_username.value;
let counter = 1;
document.getElementById("next").addEventListener("click",()=>{
    document.getElementById("all_repo").innerHTML = ""
    counter++
    console.log("click");
    all_results(input_username.value,counter)
})
document.getElementById("prev").addEventListener("click",()=>{
    if(counter >1) {
        
        document.getElementById("all_repo").innerHTML = ""
        counter--
        all_results(input_username.value,counter)
    }
    
})

document.getElementById("cover").addEventListener("click",()=> window.location.reload())
search_user.addEventListener("click",()=>{
    results_username.classList.remove("hidden")
    if(search_user.value = ""){
        window.location.reload()
    }
    else{
        if(document.getElementById("one_user").checked == true) {
console.log(document.getElementById("one_user").checked);
console.log(document.getElementById("all").checked);
            document.getElementById("table_body").innerHTML = ""
            document.getElementById("repo_body_table").innerHTML = ""
            fetching(input_username.value,counter)
            
            // input_username.value = ""
        }
        else if(document.getElementById("all").checked == true){
            document.getElementById("all_results").classList.remove("hidden")
            results_username.classList.add("hidden")
            
            
            all_results(input_username.value,counter)
            // input_username.value = ""
        }
        else window.location.reload()
    }


})
const fetching = (username) =>{

    fetch(`https://api.github.com/users/${username}`)
    .then((resolve) => resolve.json())
    .then((data) => {

            const obj = {
                name : data.name,
                username : data.login,
                avatar: data.avatar_url,
                followers: data.followers,
                following: data.following,
                nbr_repo : data.public_repos,
                link: data.html_url
            }
            document.getElementById("avatar").setAttribute("src",`${obj.avatar}`)
            document.getElementById("table_body").innerHTML = `
            <tr>
            <td> ${obj.name} </td>
            <td>${obj.username} </td>
            <td> ${obj.followers} </td>
            <td> ${obj.following} </td>
            <td>${obj.nbr_repo} </td>
            <td ><a href="${obj.link}" target="_blank" >${obj.link} </a> </td>
            </tr>
            `

    
}).catch((err)=> location.reload())

    fetch(`https://api.github.com/users/${username}/repos`)
    .then((resolve) => resolve.json())
    .then((data) => {
        
        for (let i = 0; i < data.length; i++) {
            const el = data[i];
            
            
    const obj = {
        name : el.name,
               
        link: el.html_url
    }
            document.getElementById("repo_body_table").innerHTML += `
            <tr>
            <td> ${obj.name} </td>
            
            <td ><a href="${obj.link}" target="_blank" >${obj.link} </a> </td>
            </tr>
            `
        }
        
        search_user.disabled = false;
        
}).catch((err)=> location.reload())

}


const all_results = (username,counter) =>{
    fetch(`https://api.github.com/search/users?q=${username}&per_page=10&page=${counter}`)
    .then((resolve)=> resolve.json())
.then((data)=>{
    document.getElementById("pages").innerHTML = `${counter*10}/${data.total_count} results `
    console.log(data.items);
    console.log(data.total_count);
    console.log(username);
    data.items.forEach(element =>{
        const obj= {
            username : element.login,
            link : element.html_url,
            avatar: element.avatar_url
            
        }
        document.getElementById("all_repo").innerHTML +=`
        <tr> 
            <td> <img id="avatar_all" src="${obj.avatar}"></td>
            
            <td>${obj.username} </td>
            
            <td ><a href="${obj.link}" target="_blank" >${obj.link} </a> </td>
            
            </tr>
            `
        })
        
        
    })
}