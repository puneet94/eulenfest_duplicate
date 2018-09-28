
    
    const URL = 'https://www.einbecker-morgenpost.de/';
    const apiURL = 'https://api.mopo-server.de/';
    const apiKey = 'q5C14XWd5jwc2f7FkQKL3aobgJmZQnt6';
    const fileURL = 'https://www.einbecker-morgenpost.de/';

    const OneSignalKey = '2966fcc4-99f5-424e-b4de-14dc601109ab';
    const googleProjectNumber = '1031843464586';

    const getEventList = function(pid,page) {
        return fetch(apiURL+'eulenfest.html?authtoken='+apiKey+'&pid='+pid+'&page_n82='+page);
        }
    const getEventEntry = function(id) {
        return fetch(apiURL+'events/eventreader.html?authtoken='+apiKey+'&id='+id);
        }    
    const getNewsList = function(page) {
        console.log("url",apiURL+'news.html?authtoken='+apiKey+'&pid=14&page_n58='+page);
        return fetch(apiURL+'news.html?authtoken='+apiKey+'&pid=14&page_n58='+page);
        }
    const getNewsEntry = function(id) {
        return fetch(apiURL+'news/newsreader.html?authtoken='+apiKey+'&id='+id);
    }    
    
    const getStargast = function() {
        return fetch(apiURL+'share/eulenfest_app_stargast.php');
    } 
    const getGewinnspiel = function() {
        return fetch(apiURL+'share/eulenfest-app-gewinn.json');
    }
    
    const getVoSonntag = function() {
        return fetch(apiURL+'share/eulenfest-app-vosonntag.json');
    }

    const getFotoStart = function() {
        return fetch(apiURL+'share/eulenfest-app-gew_start.json');
    }

    export  {
       getEventList,
        getEventEntry,
        getNewsList,
        getNewsEntry,
        getStargast,
       getGewinnspiel,
       getVoSonntag,
       getFotoStart,
    }
    

