//昊
const cheerio = createCheerio()
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const appConfig = {
    ver: 1,
    title: '美剧网|8',
    site: 'https://www.j00j.com/',
    tabs: [
        {
            name: '欧美剧',
            ext: {
                id: 20,
            },
        },
        {
            name: '新马泰剧',
            ext: {
                id: 21,
            },
        },
        {
            name: '韩剧',
            ext: {
                id: 22,
            },
        },{
            name: '日剧',
            ext: {
                id: 23,
            },
        },{
            name: '台剧',
            ext: {
                id: 25,
            },
        },{
            name: '在线电影',
            ext: {
                id: 24,
            },
        },{
            name: '在线综艺',
            ext: {
                id: 36,
            },
        },{
            name: '在线动漫',
            ext: {
                id: 43,
            },
        },{
            name: '在线预告',
            ext: {
                id: 48,
            },
        },{
            name: '在线短剧',
            ext: {
                id: 49,
            },
        }
        
    ],
}
async function getConfig() {
    return jsonify(appConfig)
}


//https://www.j00j.com/index.php/vod/show/id/20/page/2.html


async function getCards(ext) {
    ext = argsify(ext)
    let cards = []
    let { page = 1, id } = ext
    const url =appConfig.site + `/index.php/vod/show/id/${id}/page/${page}.html` 
    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })
    const $ = cheerio.load(data)
    const videos = $('.module-poster-item')
    videos.each((_, e) => {
        const href = $(e).attr('href')
        const title = $(e).attr('title')
        const cover = $(e).find('img').attr('data-original')
        const remarks = $(e).find('.module-item-note').text().trim()
        cards.push({
            vod_id: href,
            vod_name: title,
            vod_pic: cover,
            vod_remarks: remarks, // 海報右上角的子標題
            ext: {
                url: `${appConfig.site}${href}`,
            },
        })
    })

    return jsonify({
        list: cards,
    })
}

/*

async function getTracks(ext) {
    
    ext = argsify(ext)
   let groups = []
    
    let url = ext.url
    
    

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })


    

    const $ = cheerio.load(data)
    let tabDict = {}
    //获取外层列表
    const tabItems = $('.module-tab-item')
   for (let i = 0; i < tabItems.length; i++) {
        const element = tabItems[i];
        
        // 优先获取 tabName，若为空则获取 data-dropdown-value
        const tabName = $(element).find('span').text().trim() || $(element).attr('data-dropdown-value');
        
        // 将 tabName 和对应的索引 i+1 添加到字典中
        tabDict[tabName] = i + 1; 
  
     let group = {
              title:tabName  ,
              tracks: [],
        }

    //提取href 剧集按钮
    
    const playlist = $('.module-play-list-link').toArray()
    for (let i = 0; i < playlist.length; i++) {
       const element = playlist[i];
        let name = $(element).attr('title')
        const regex = $(element).attr('href')[1].replace(/sid\/\d+/g, `sid/${tabValue}`).replace(/nid\/\d+/g, `nid/${tabValue}`);//"/index.php/vod/play/id/106815/sid/1/nid/7.html";替换里面的1

        const ShareUrl = appConfig.site +  $(e).attr('href').match(regex);

//https://www.j00j.com/index.php/vod/play/id/106815/sid/1/nid/1.html
        
    


        
         const new_data = await $fetch.get(ShareUrl, {
                headers: {
                    'User-Agent': UA,
                
                },
            });


      


player_aaaa 数据: {
  flag: "play",
  encrypt: 0,
  trysee: 0,
  points: 0,
  link: "/index.php/vod/play/id/106815/sid/1/nid/1.html",
  link_next: "/index.php/vod/play/id/106815/sid/1/nid/2.html",
  link_pre: "",
  vod_data: {
    vod_name: "触击手",
    vod_actor: "铜木亨之,仓科加奈,平原哲,阿久江仁爱,石川轩华,和田雅成,熊谷真实,朝加真由美,藕劝师赏,柳东卿十郎,小山梅海,生田宜平,福田ユミ",
    vod_director: "千笠行利,崖谷宜平",
    vod_class: "日剧"
  },
  url: "https://vv.jisuzyv.com/play/9aA4LQze",
  url_next: "https://vv.jisuzyv.com/play/lejD37Rb",
  from: "jsyun",
  server: "no",
  note: "",
  id: "106815",
  sid: 1,
  nid: 1
}


        
        const regex = /var player_aaaa=(\{.*?\});/s;
        const playlists = new_data.match(regex);
        const playerData = JSON.parse(match[1]).url

        
            group.tracks.push({
                name: name,
                pan: '',
                ext: {
                    url: playerData,
                },
            });
        

        
     

if (group.tracks.length > 0) {
      groups.push(group)
    }





        
    }//内循环



   }//外循环

    

return jsonify({ list: groups })
      
   
}







async function getPlayinfo(ext) {
    ext = argsify(ext)
    const url = ext.url
    return jsonify({ urls: [url] })
}


*/


//

//https://www.j00j.com/index.php/vod/search/page/2/wd/柯南.html
async function search(ext) {
    ext = argsify(ext)
    let cards = []

    let text = encodeURIComponent(ext.text)
    let page = ext.page || 1
    let url = `${appConfig.site}/index.php/vod/search/page/${page}/wd/${text}.html`//https://yhdm.one/search?q=%E5%90%8D

    const { data } = await $fetch.get(url, {
        headers: {
            'User-Agent': UA,
        },
    })

    const $ = cheerio.load(data)

    const videos = $('.module-card-item')
    videos.each((_, e) => {
        const href = $(e).find('a.module-card-item-poster').attr('href') || '';
        
        const title =  $(e).find('.module-card-item-title strong').text().trim() || '';
        
        const cover =$(e).find('.module-item-pic img').attr('data-original') || '';  
        const remarks = $(e).find('.module-item-note').text().trim() || '';

        
        cards.push({
            vod_id: href,
            vod_name: title,
            vod_pic: cover,
            vod_remarks: remarks,

            ext: {
                url: `${appConfig.site}${href}`,
            },
        })
    })
    return jsonify({
        list: cards,
    })
}