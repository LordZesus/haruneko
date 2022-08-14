// Auto-Generated export from HakuNeko Legacy
//import { Tags } from '../Tags';
import icon from './RaiderScans.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^https?:\/\/raiderscans\.com\/manga\/[^/]+\/$/)
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageAJAXv1()
@Madara.PagesSinglePageCSS()
@Common.ImageDirect()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('raiderscans', 'RaiderScans', 'https://raiderscans.com'/*, Tags.Media., Tags.Language.*/);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class RaiderScans extends WordPressMadara {

    constructor() {
        super();
        super.id = 'raiderscans';
        super.label = 'RaiderScans';
        this.tags = [ 'manga', 'webtoon', 'english' ];
        this.url = 'https://raiderscans.com';
    }
}
*/