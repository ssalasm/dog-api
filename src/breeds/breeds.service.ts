import { Injectable } from '@nestjs/common';
import { CreateBreedDto } from './dto/create-breed.dto';
import { UpdateBreedDto } from './dto/update-breed.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Breed, BreedDocument } from 'src/schemas/breed.schema';

@Injectable()
export class BreedsService {

  constructor(@InjectModel(Breed.name) private breedModel: Model<BreedDocument>) {}

  async create(createBreedDto: CreateBreedDto): Promise<Breed> {
    return new this.breedModel(createBreedDto).save();
  }

  findAll() {
    return this.breedModel.find()
  }

  findOne(name: string) {
    return this.breedModel.findOne({ name });
  }

  update(name: string, updateBreedDto: UpdateBreedDto) {
    return this.breedModel.updateOne({ name }, { $set: {...updateBreedDto} })
  }

  remove(name: string) {
    return this.breedModel.deleteOne({ name });
  }
}
