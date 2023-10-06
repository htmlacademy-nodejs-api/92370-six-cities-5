import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import {
  createOffer,
  getErrorMessage,
  getMongoURI,
} from '../../shared/helpers/index.js';
import { AuthorService } from '../../shared/models/author/author-service.interface.js';
import {
  DefaultOfferService,
  OfferModel,
  OfferService,
} from '../../shared/models/offer/index.js';
import {
  DatabaseClient,
  MongoDatabaseClient,
} from '../../shared/libs/database-client/index.js';
import { Logger } from '../../shared/libs/logger/index.js';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger.js';
import {
  DefaultAuthorService,
  AuthorModel,
} from '../../shared/models/author/index.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { Offer } from '../../shared/types/index.js';

export class ImportCommand implements Command {
  private authorService: AuthorService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.authorService = new DefaultAuthorService(this.logger, AuthorModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const author = await this.authorService.findOrCreate(
      {
        ...offer.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt
    );

    await this.offerService.create({
      title: offer.title,
      description: offer.description,
      postDate: offer.postDate,
      city: offer.city,
      preview: offer.preview,
      photos: offer.photos,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      type: offer.type,
      rooms: offer.rooms,
      guests: offer.guests,
      cost: offer.cost,
      services: offer.services,
      author: offer.author,
      comments: offer.comments,
      coordinates: offer.coordinates,
      authorId: author.id,
    });
  }

  public getName(): string {
    return '--import';
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbname: string,
    salt: string
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
