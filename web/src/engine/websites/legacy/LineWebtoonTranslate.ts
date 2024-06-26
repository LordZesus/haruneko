// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './LineWebtoonTranslate.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('linewebtoon-translate', `Line Webtoon (Translate)`, 'https://translate.webtoons.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class LineWebtoonTranslate extends LineWebtoon {

    constructor() {
        super();
        super.id = 'linewebtoon-translate';
        super.label = 'Line Webtoon (Translate)';
        this.tags = [ 'webtoon', 'scanlation', 'multi-lingual' ];
        this.url = 'https://translate.webtoons.com';
        this.baseURL = 'https://translate.webtoons.com';
        this.requestOptions.headers.set('x-referer', this.baseURL);
    }

    async _getMangaListPage(uri) {
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, 'div.work_wrap ul.work_lst >li > a');
        return data.map(element => {
            let title = element.querySelector('div.info_area p.subj').textContent.trim();
            let language = element.querySelector('div.info_area span.country_txt').textContent.trim();
            //let translator = element.querySelector('div.info_area span.author').textContent.trim();
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, request.url),
                title: `${title} - ${language} Fan Translation`
            };
        });
    }

    async _getMangaList(callback) {
        try {
            let mangaList = [];
            let uri = new URL('/', this.baseURL);
            for(let page = 1; page < 999; page++) {
                uri.searchParams.set('page', page);
                let mangas = await this._getMangaListPage(uri);
                if(mangas.length > 0 && (mangaList.length === 0 || mangas[mangas.length - 1].id !== mangaList[mangaList.length - 1].id)) {
                    mangaList.push(...mangas);
                } else {
                    break;
                }
            }
            callback(null, mangaList);
        } catch(error) {
            console.error(error, this);
            callback(error, undefined);
        }
    }
}
*/