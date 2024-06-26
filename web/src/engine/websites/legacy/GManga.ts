// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './GManga.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('gmanga', `GManga`, 'https://gmanga.me' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class GManga extends Connector {

    constructor() {
        super();
        super.id = 'gmanga';
        super.label = 'GManga';
        this.tags = ['manga', 'webtoon', 'arabic'];
        this.url = 'https://gmanga.me';
        this.apiurl = 'https://api.gmanga.me';

        this.mangaSearch = {
            title: '',
            manga_types: {
                include: ['1', '2', '3', '4', '5', '6', '7', '8'],
                exclude: []
            },
            oneshot: { value: null },
            story_status: { include: [], exclude: [] },
            translation_status: { include: [], exclude: ['3'] },
            categories: { include: [], exclude: [] },
            chapters: { min: '', max: '' },
            dates: { start: null, end: null },
            page: 0
        };
    }

    async _getMangaFromURI(uri) {
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, 'script[data-component-name="HomeApp"]');
        data = JSON.parse(data[0].textContent);
        let id = data.mangaDataAction.mangaData.id;
        let title = data.mangaDataAction.mangaData.title; // data.mangaDataAction.mangaData.arabic_title
        return new Manga(this, id, title);
    }

    async _getMangas() {
        let mangaList = [];
        for (let page = 1, run = true; run; page++) {
            let mangas = await this._getMangasFromPage(page);
            mangas.length > 0 ? mangaList.push(...mangas) : run = false;
        }
        return mangaList;
    }

    async _getMangasFromPage(page) {
        this._setMangaRequestOptions(page);
        let request = new Request(new URL('/api/mangas/search', this.apiurl), this.requestOptions);
        this._clearRequestOptions();
        let data = await this.fetchJSON(request);
        data = data['iv'] ? this._haqiqa(data.data) : data;
        data = data.mangas || [];
        return data.map(manga => {
            return {
                id: manga.id,
                title: manga.title
            };
        });
    }

    async _getChapters(manga) {
        function getMangaSlug(/*mangaTitle*) {
            // NOTE: As of today, the manga slug (e.g. 'how-to-fight') can be any arbitrary string
            return 'manga-slug'; // mangaTitle.replace(/\s+/g, '-').replace(/[^-\w]+/gi, '').toLowerCase();
        }
        let request = new Request(new URL(`/api/mangas/${manga.id}/releases`, this.apiurl), this.requestOptions);
        let data = await this.fetchJSON(request);
        data = data['iv'] ? this._haqiqa(data.data) : data;
        data = data['isCompact'] ? this._unpack(data) : data;
        return data.releases.map(chapter => {
            const team = data.teams.find(t => t.id === chapter.team_id);
            const chapterization = data.chapterizations.find(c => c.id === chapter.chapterization_id);
            let title = 'Vol.' + chapterization.volume + ' Ch.' + chapterization.chapter;
            title += chapterization.title ? ' - ' + chapterization.title : '';
            title += team.name ? ' [' + team.name + ']' : '';
            return {
                id: [manga.id, getMangaSlug(manga.title), chapterization.chapter, team.name].join('/'),
                title: title,
                language: ''
            };
        });
    }

    async _getPages(chapter) {
        let request = new Request(new URL('/mangas/' + chapter.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, 'script[data-component-name="HomeApp"]');
        data = JSON.parse(data[0].textContent);
        let url = (data.globals.wla.configs.http_media_server || data.globals.wla.configs.media_server) + '/uploads/releases/';
        data = data.readerDataAction.readerData.release;
        let images = [];
        if (data.pages && data.pages.length > 0) {
            images = data.pages.map(page => '/hq/' + page);
        } else {
            images = data.webp_pages.map(page => '/hq_webp/' + page);
        }
        return images.map(image => {
            let uri = new URL(url, request.url);
            uri.pathname += data.storage_key + image;
            return this.createConnectorURI(uri.href);
        });
    }

    async _handleConnectorURI(payload) {
        /*
         * TODO: only perform requests when from download manager
         * or when from browser for preview and selected chapter matches
         *
        let uri = new URL(payload, this.url);
        // See: https://gmanga.me/assets/javascripts/main_v38.js
        let lease = (parseInt(Date.now() / 1000) + 120).toString(36);
        uri.searchParams.set('ak3', lease);
        let data = await super._handleConnectorURI(uri.href);
        if (data.mimeType === 'text/html') {
            return super._handleConnectorURI(uri.href.replace('/hq', '/mq'));
        } else {
            return data;
        }
    }

    _setMangaRequestOptions(page) {
        this.mangaSearch.page = page;
        this.requestOptions.method = 'POST';
        this.requestOptions.headers.set('content-type', 'application/json');
        this.requestOptions.body = JSON.stringify(this.mangaSearch);
    }

    _clearRequestOptions() {
        delete this.requestOptions.body;
        this.requestOptions.headers.delete('content-type');
        this.requestOptions.method = 'GET';
        this.mangaSearch.page = 0;
    }

    /**
     *******************
     * ** BEGIN GMANGA ***
     ******************
     *

    _r(t) {
        return (this._r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t;
        }
            : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            }
        )(t);
    }

    _a(t) {
        return (this._a = "function" == typeof Symbol && "symbol" === this._r(Symbol.iterator) ? function (t) {
            return this._r(t);
        }.bind(this)
            : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : this._r(t);
            }.bind(this)
        )(t);
    }

    _isObject(t) {
        var e = this._a(t);
        return "function" === e || "object" === e && !!t;
    }

    _dataExists(t) {
        var e = null !== t;
        return "object" === this._a(t) ? e && 0 !== Object.keys(t).length : "" !== t && void 0 !== t && e;
    }

    _haqiqa(t) {
        let c = { default: CryptoJS };
        if (!this._dataExists(t) || "string" != typeof t)
            return !1;
        var e = t.split("|")
            , n = e[0]
            , r = e[2]
            , o = e[3]
            , i = c.default.SHA256(o).toString()
            , a = c.default.AES.decrypt({
                ciphertext: c.default.enc.Base64.parse(n)
            }, c.default.enc.Hex.parse(i), {
                iv: c.default.enc.Base64.parse(r)
            });
        return JSON.parse(c.default.enc.Utf8.stringify(a));
    }

    _unpack(t) {
        var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1;
        if (!t || e > t.maxLevel)
            return t;
        if (!this._isObject(t) || !t.isCompact)
            return t;
        var n = t.cols
            , r = t.rows;
        if (t.isObject) {
            var o = {}
                , i = 0;
            return n.forEach(function (t) {
                o[t] = this._unpack(r[i], e + 1),
                i += 1;
            }.bind(this)),
            o;
        }
        if (t.isArray) {
            o = [];
            return r.forEach(function (t) {
                var e = {}
                    , r = 0;
                n.forEach(function (n) {
                    e[n] = t[r],
                    r += 1;
                }),
                o.push(e);
            }),
            o;
        }
    }

    /**
     *****************
     * ** END GMANGA ***
     ****************
     *
}
*/