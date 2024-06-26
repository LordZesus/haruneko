import { Initialize as InitGlobalSettings } from './SettingsGlobal';
import { Tags } from './Tags';
import { PluginController } from './PluginController';
import { BookmarkPlugin } from './providers/BookmarkPlugin';
import { ItemflagManager } from './ItemflagManager';
import { CreateStorageController, type StorageController } from './StorageController';
import { InteractiveFileContentProvider } from './InteractiveFileContentProvider';
import { SettingsManager } from './SettingsManager';
import { FeatureFlags } from './FeatureFlags';
import { DownloadManager } from './DownloadManager';
import { Key as GlobalKey } from './SettingsGlobal';
import type { Check } from './SettingsManager';
import { CreateBloatGuard } from './platform/BloatGuard';
import { CreateFetchProvider, SetupFetchProviderExports } from './platform/FetchProvider';
import { CreatePlatformIPC } from './platform/InterProcessCommunication';
import type { IFrontendInfo } from '../frontend/IFrontend';

export class HakuNeko {

    readonly #storageController: StorageController;
    readonly #settingsManager: SettingsManager;
    readonly #featureFlags: FeatureFlags;
    readonly #pluginController: PluginController;
    readonly #bookmarkPlugin: BookmarkPlugin;
    readonly #itemflagManager: ItemflagManager;
    readonly #downloadManager: DownloadManager;

    constructor() {
        this.#storageController = CreateStorageController();
        this.#settingsManager = new SettingsManager(this.#storageController);
        this.#featureFlags = new FeatureFlags(this.#settingsManager);
        this.#pluginController = new PluginController(this.#storageController, this.#settingsManager);
        this.#bookmarkPlugin = new BookmarkPlugin(this.#storageController, this.#pluginController, new InteractiveFileContentProvider());
        this.#itemflagManager = new ItemflagManager(this.#storageController);
        this.#downloadManager = new DownloadManager(this.#storageController);
        SetupFetchProviderExports(CreateFetchProvider(this.#featureFlags));
    }

    public async Initialze(frontends: IFrontendInfo[]): Promise<void> {
        CreateBloatGuard().Initialize();
        await this.FeatureFlags.Initialize();
        await InitGlobalSettings(this.SettingsManager, frontends);
        /*const ipc = */CreatePlatformIPC(this.#settingsManager);
        // Preload bookmarks flags to show content to view
        const checkNewContent = this.SettingsManager.OpenScope().Get<Check>(GlobalKey.CheckNewContent).Value ;
        if (checkNewContent) this.BookmarkPlugin.RefreshAllFlags();

    }

    public get Tags() {
        return Tags;
    }

    public get PluginController(): PluginController {
        return this.#pluginController;
    }

    public get FeatureFlags(): FeatureFlags {
        return this.#featureFlags;
    }

    public get SettingsManager(): SettingsManager {
        return this.#settingsManager;
    }

    public get BookmarkPlugin(): BookmarkPlugin {
        return this.#bookmarkPlugin;
    }

    public get ItemflagManager(): ItemflagManager {
        return this.#itemflagManager;
    }

    public get DownloadManager(): DownloadManager {
        return this.#downloadManager;
    }
}