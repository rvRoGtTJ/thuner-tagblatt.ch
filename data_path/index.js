$( document ).ready(function() {
    let titleLength = 75;

    $.get('https://publish.barrikade.info/?page=articleCollection&debut_articles=10',  // url
      function (data, textStatus, jqXHR) {  
        $('.newest').each(function( index, value){
            $(value).find('h5').text(text_truncate(data.data[index].title, titleLength))
            $(value).find('img').attr("src",data.data[index].logo)
            $(value).find('a').attr("href",'https://barrikade.info/article/' + data.data[index].id + '?ref=thunertagblatt');
        })
        $( ".ph-item-main-right" ).each((index, item) => {
            $(item).hide()
        })
        let pubdates = [
            'vor 4 Min',
            'vor 22 Min',
            'vor 36 Min',
            'vor 47 Min',
            'vor 1 Std',
            'vor 1 Std',
            'vor 1 Std',
            'vor 1 Std',
            'vor 2 Std',
            'vor 2 Std'
        ]
        $('.pubdate').each(function( index, value){
            $(value).text(pubdates[index])
        })

    });

    $.get('https://publish.barrikade.info/?page=api-start-page',  // url
      function (data, textStatus, jqXHR) {  
        $( "#main-article-head" ).html($(data.featuredArticle.chapo).text())
        $( "#main-article-header" ).text(text_truncate(data.featuredArticle.title, titleLength))
        $("#main-article-image").attr("src",data.featuredArticle.logo);
        $("#main-article-link").attr("href",'https://barrikade.info/article/' + data.featuredArticle.id + '?ref=thunertagblatt');
        $( "#ph-item-main" ).hide()
        
        data.headlineArticles.forEach((item, index) => {
            let stories = $( ".story-list-item" )
            $(stories[index + 1]).find('.storytitle h3').text(text_truncate(item.title, titleLength))
            if (item.tags[0]) {
                $(stories[index + 1]).find('.storytitle .kicker').text(item.tags[0].title)
            }
            $(stories[index + 1]).find('.lead p').text(text_truncate($(item.chapo).text()))
            $(stories[index + 1]).find('.storyimage').attr("src",item.logo)
            $(stories[index + 1]).parent().attr("href",'https://barrikade.info/article/' + item.id + '?ref=thunertagblatt');
        });

        data.global.forEach((item, index) => {
            let stories = $( ".story-list-item" )
            $(stories[index + 4]).find('.storytitle h3').text(text_truncate(item.title, titleLength))
            if (item.tags[0]) {
                $(stories[index + 4]).find('.storytitle .kicker').text(item.tags[0].title)
            }
            $(stories[index + 4]).find('.lead p').text(text_truncate($(item.chapo).text()))
            $(stories[index + 4]).find('.storyimage').attr("src",item.logo)
            $(stories[index + 4]).parent().attr("href",'https://barrikade.info/article/' + item.id + '?ref=thunertagblatt');
        });

        data.analysis.forEach((item, index) => {
            let stories = $( ".story-list-item" )
            $(stories[index + 7]).find('.storytitle h3').text(text_truncate(item.title, titleLength))
            if (item.tags[0]) {
                $(stories[index + 7]).find('.storytitle .kicker').text(item.tags[0].title)
            }
            $(stories[index + 7]).find('.lead p').text(text_truncate($(item.chapo).text()))
            $(stories[index + 7]).find('.storyimage').attr("src",item.logo)
            $(stories[index + 7]).parent().attr("href",'https://barrikade.info/article/' + item.id + '?ref=thunertagblatt');
        });

        $( ".ph-item-main-middle" ).each((index, item) => {
            $(item).hide()
        })

        let authors = [
            'Peter Siegenthaler',
            'Raphael Lanz',
            'Andrea de Meuron',
            'Roman Gimmel',
            'Konrad Hädener',
            'Daniela Huber Notter',
            'Roman Gugger',
            'Adrian Christen',
            'Alois Studerus',
            'Serge Lanz'

        ]
        $('.authors').each(function( index, value){
            $(value).text(authors[index])
        })

        $('.story-list-item time').each((index, item) => {
            let timeStr  = (((index * 17)  + 3) % 10)
            if (timeStr === 0) {
                timeStr = 1
            }
            $(item).text('vor ' + timeStr + ' Std')
        })
    });
});

text_truncate = function(str, length, ending) {
    if (length == null) {
      length = 200;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };