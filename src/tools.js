function makeCard(title, url, thumbnail, views){

    const card =    `<div class="col">
                        <a class="card" href="` + url + `">
                            <img class="yk-thumbnail-img" src="` + thumbnail + `">
                            <div class="card-body">
                                <p class="card-text">`
                                    + title +
                                `</p>
                                <div class="d-flex">
                                    <small class="text-muted">再生回数: ` + views + `回</small>
                                </div>
                            </div>
                        </a>
                    </div>`

    return card
}

function search(search_word){
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                var res_list = JSON.parse(xhr.response)

                card_list.innerHTML = ``

                var i = 0

                for(const res of res_list){

                    if(i < 10){ //max20個まで表示
                        const room_url = "./viewer.html?room_id="+res.id
                        const thumbnail_url = '/api/static/room/'+res.id+'/thumbnail.jpg'
                        card_list.innerHTML += makeCard(res.title, room_url, thumbnail_url, res.views)
                    }

                    i += 1
                }


            } else {
                console.log("Error. Status: " + status)
            }
        }
    }

    xhr.open('GET', '/api/rooms?search_word='+search_word) 
    xhr.send()
}

function getUserName(user_id){

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                var res = JSON.parse(xhr.response)
                return res.name
            } else {
                console.log("Error. Status: " + status)
            }
        }
    }

    xhr.open('GET', '/api/users/'+user_id) 
    xhr.send()
}

function makeRoomInfoList(title, description, author, times, comment){
    const infoList =    `<p class="yk-left">タイトル: ` + title + `</p>
                    <p class="yk-left">説明文: ` + description + `</p>
                    <p class="yk-left">製作者: ` + author + `</p>
                    <p class="yk-right">再生回数: ` + times + `回</p>
                    <p class="yk-left">コメント: ` + comment + `</p>`

    return infoList
}

function makeRoomInfo(room_id){

    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            var status = xhr.status;
            if (status === 0 || (status >= 200 && status < 400)) {
                var res = JSON.parse(xhr.response)
                var user_name = getUserName(res.author)
                room_info.innerHTML = makeRoomInfoList(res.title, res.description, res.author, res.views, "none")
            } else {
                console.log("Error. Status: " + status)
            }
        }
    }

    xhr.open('GET', '/api/rooms/'+room_id) 
    xhr.send()
}