// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './HentaiShark.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('hentaishark', `Hentai Shark`, 'https://www.hentaishark.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class HentaiShark extends Connector {

    constructor() {
        super();
        super.id = 'hentaishark';
        super.label = 'Hentai Shark';
        this.tags = ['hentai', 'multi-lingual'];
        this.url = 'https://www.hentaishark.com';
    }

    async _getMangas() {
        let mangaList = [];
        const request = new Request(this.url, this.requestOptions);
        const data = await this.fetchDOM(request, 'div.type-content li:nth-last-of-type(2) > a');
        const pageCount = parseInt(data[0].href.match(/(\d+)$/)[1]);
        for(let page = 1; page <= pageCount; page++) {
            let mangas = await this._getMangasFromPage(page);
            mangaList.push(...mangas);
        }
        return mangaList;
    }

    async _getMangasFromPage(page) {
        const request = new Request(new URL(`/manga-list?page=${page}`, this.url), this.requestOptions);
        const data = await this.fetchDOM(request, 'div.item > a');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.querySelector('div.caption').textContent.trim()
            };
        });
    }

    async _getMangaFromURI(uri) {
        const request = new Request(new URL(uri.href), this.requestOptions);
        const data = await this.fetchDOM(request, 'div.col-sm-7 > h2');
        return new Manga(this, uri.pathname, data[0].textContent.trim());
    }

    async _getChapters(manga) {
        return [ Object.assign({ language: '' }, manga) ];
    }

    async _getPages(chapter) {
        const request = new Request(new URL(chapter.id, this.url), this.requestOptions);
        const data = await this.fetchDOM(request, 'a > source.lazy');
        return data.map(ele => ele.src.replace('thumb_', ''));
    }
}
*/