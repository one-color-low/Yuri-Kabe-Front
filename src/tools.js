function makeCard(title, url, thumbnail, time){

    const card =    `<div class="col">
                        <a class="card" href="` + url + `">
                            <img class="yk-thumbnail-img" src="` + thumbnail + `">
                            <div class="card-body">
                                <p class="card-text">`
                                    + title +
                                `</p>
                                <div class="d-flex">
                                    <small class="text-muted">` + time + `</small>
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

                for(const res of res_list){

                    const room_url = "./viewer.html?room_id="+res.id

                    card_list.innerHTML += makeCard(res.title, room_url, "./img/miku.webp", "15min")

                }


            } else {
                console.log("Error. Status: " + status)
            }
        }
    }

    xhr.open('GET', '/api/rooms?search_word='+search_word) 
    xhr.send()
}

function makeRoomInfoList(title, description, times, comment){
    const infoList =    `<p class="yk-left">タイトル: ` + title + `</p>
                    <p class="yk-left">説明文: ` + description + `</p>
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
                room_info.innerHTML = makeRoomInfoList(res.title, res.description, "111", "none")
            } else {
                console.log("Error. Status: " + status)
            }
        }
    }

    xhr.open('GET', '/api/rooms/'+room_id) 
    xhr.send()
}