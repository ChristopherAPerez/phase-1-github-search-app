//Form////////////////////////////////////////////////////////////////////////////////////
let form = document.querySelector("#github-form")
form.addEventListener('submit', searchPick)

//Toggle-Button Text/////////////////////////////////////////////////////////////////
let toggle = document.querySelector('#toggle')
let searchText = document.getElementById('search')

toggle.addEventListener('click', function(){
    if(toggle.value === 'Search Repos'){
        toggle.value = 'Search User'
        searchText.placeholder = 'Search Repos'
    } else if(toggle.value === 'Search User'){
        toggle.value = 'Search Repos'
        searchText.placeholder = 'Search Users'
    }
})



function searchPick(e){
    e.preventDefault()
    let searchValue = e.target.search.value

    if(toggle.value === 'Search Repos'){
        searchUsers(searchValue)
    } else if(toggle.value === 'Search User'){
        searchRepos(searchValue)
    }
}

function searchUsers(searchValue){
    fetch(`https://api.github.com/search/users?q=${searchValue}`)
        .then(resource => resource.json())
        .then(function(dataResults){
            let data = dataResults.items
            for(let key of data){
                let li = document.createElement('li')
                let user = key.login
                li.innerHTML = `
                <p>
                User: ${user}<br>
                User Homepage: ${key.html_url}<br>
                <img src="${key.avatar_url}">
                </p>
                `
                document.querySelector('#user-list').append(li)
                li.style.cursor = "pointer"
                li.addEventListener('click', function(){
                    fetch(`https://api.github.com/users/${user}/repos`)
                    .then(resource => resource.json())
                    .then(function(reposData){
                        let reposList = document.querySelector('#repos-list')
                        reposList.innerHTML = ``
                        for(let dataKey of reposData){
                            //let keyValues = Object.entries(key)
                            let li = document.createElement('li')
                            li.innerHTML = dataKey.name
                            document.querySelector('#repos-list').append(li)
                        }
                    })
                })
            }
        })
}

function searchRepos(searchValue){
    fetch(`https://api.github.com/search/repositories?q=${searchValue}`)
        .then(resource => resource.json())
        .then(function(dataResults){
            let data = dataResults.items
            
            for(let key of data){
                let li = document.createElement('li')
                li.innerHTML = `${key.name}`
                document.querySelector('#user-list').append(li)
                
                li.style.cursor = "pointer"
                li.addEventListener('click', function(){
                    let li = document.createElement('li')
                    li.style.listStyle = "none"
                    li.innerHTML = `
                    <p>
                    <img src="${key.owner.avatar_url}">
                    Username: ${key.owner.login}<br>
                    Homepage: ${key.owner. html_url}<br>
                    </p>
                    `
                    document.querySelector('#repos-list').append(li)
                })
            }
        })
}

