//昊
//2025-3
//需要-主站-登入食用
const cheerio = createCheerio()
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_2 like Mac OS X) AppleWebKit/604.1.14 (KHTML, like Gecko)'
//$utils.toastError(jsonify(UA))
const appConfig = {
	ver: 1,
	title: 'Pomo',
	site: 'https://pomo.mom/',
	tabs: [
		{
			name: '华语热门',
			ext: {
				id: 'huayurm',
			},
		},
		{
			name: '家庭影院',
			ext: {
				id: 'jiating',
			},
		},
		{
			name: '动画大电影',
			ext: {
				id: 'donghuadadiany',
			},
		},
		{
			name: '冷门佳片',
			ext: {
				id: 'lengmenjiapian',
			},
		},
		{
			name: 'TOP250',
			ext: {
				id: 'paihangbang',
			},
		},
		{
			name: '蓝光原盘',
			ext: {
				id: 'lengmenjiapian',
			},
		},
		{
			name: '剧集',
			ext: {
				id: 'dianshiju',
			},
		}

		
	],

}
async function getConfig() {

	return jsonify(appConfig)
}

async function getCards(ext) {
	ext = argsify(ext)
	let cards = []
	let { page = 1, id } = ext


	const url = `${appConfig.site}${id}/page/${page}`

	const { data } = await $fetch.get(url, {
		headers: {
			"User-Agent": UA,
		},
	});
	const $ = cheerio.load(data)

	   $('a.block.h-full').each((index, element) => { 
       // 这里必须是个列表class
      console.log(index)
      const href = $(element).attr('href')
      const alt = $(element).find('img').attr('alt')
      const src = $(element).find('img').attr('src')//短连接
       
      
      console.log(href)
      cards.push({
        vod_id: href,
        vod_name: alt,
        vod_pic: src,   
      ext: {
				url:  href,
			},
    })
    
  })
	return jsonify({
		list: cards,
	})
}





async function getTracks(ext) {
    ext = argsify(ext);
    let tracks = [];
    let url = ext.url;

    const { data } = await $fetch.get(url, {
        headers: { 'User-Agent': UA },
    });

    //const $ = cheerio.load(data);



    // 2. 核心逻辑：使用正则全局匹配多条夸克网盘链接
    // 匹配以 https://pan.quark.cn/s/ 开头的完整链接
    const quarkRegex = /https?:\/\/pan\.quark\.cn\/s\/[^\s"'<>]+/g;
    const quarkMatches = data.match(quarkRegex);

    if (quarkMatches && quarkMatches.length > 0) {
        // 遍历所有匹配到的链接
        quarkMatches.forEach((panUrl) => {
            // 简单去重：如果 tracks 里已经有这个链接了，就不重复添加
                         const cleanUrl = panUrl.replace(/[\\\"\'&]+$/, '');
            const isExist = tracks.some(item => item.pan === cleanUrl);
            if (!isExist) {
                tracks.push({ 
                    name: '夸克网盘', 
                    pan: cleanUrl 
                });
            }
        });
    }
//$utils.toastError(jsonify(tracks))
    return jsonify({
        list: [{ title: '默认分组', tracks }],
    });
}


async function getPlayinfo(ext) {
	return jsonify({ urls: [] })
}



async function search(ext) {
	ext = argsify(ext)

	let cards = []
	let text =  encodeURIComponent(ext.text)
	let page = ext.page || 1
	//https://pomo.mom/?keyword=永恒&page=2&pjax=1
	let url = `${appConfig.site}?keyword=${text}&page=${page}&pjax=1`

	const { data } = await $fetch.get(url, {
		headers: {
			"User-Agent": UA,
		},
	})

	const $ = cheerio.load(data)

	const videos = $('li.media.thread.tap')

		   $('a.block.h-full').each((index, element) => { 
       // 这里必须是个列表class
      console.log(index)
      const href = $(element).attr('href')
      const alt = $(element).find('img').attr('alt')
      const src = $(element).find('img').attr('src')//短连接
       
      
      console.log(href)
      cards.push({
        vod_id: href,
        vod_name: alt,
        vod_pic: src,
ext: {
				url:  href,
			},
 
          
    })
    
  })


	return jsonify({
		list: cards,
	})
}



