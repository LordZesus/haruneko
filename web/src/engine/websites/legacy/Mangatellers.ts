import { Tags } from '../../Tags';
import icon from './Mangatellers.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';
import * as Common from '../decorators/Common';
import * as FoolSlide from '../decorators/FoolSlide';

@FoolSlide.MangaCSS(/^https?:\/\/reader\.mangatellers.gr\/series\/[^/]+\/$/)
@FoolSlide.MangasMultiPageCSS()
@FoolSlide.ChaptersSinglePageCSS()
@FoolSlide.PagesSinglePageREGEX()
@Common.ImageAjax()
export default class extends DecoratableMangaScraper {
    public constructor() {
        super('mangatellers', `Mangatellers`, 'https://reader.mangatellers.gr', Tags.Language.English, Tags.Source.Scanlator, Tags.Media.Manga);
    }
    public override get Icon() {
        return icon;
    }
}