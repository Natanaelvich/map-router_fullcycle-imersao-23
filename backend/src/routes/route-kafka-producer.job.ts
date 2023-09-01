import { Job } from 'bull';
import { Process, Processor } from '@nestjs/bull';
import { ClientKafka } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';

@Processor('kafka-producer')
export class RouteKafkaProducerJob {
  constructor(
    @Inject('KAFKA_SERVICE')
    private kafkaService: ClientKafka,
  ) {}

  @Process()
  handle(job: Job<any>) {
    this.kafkaService.emit('route', job.data);
    return {};
  }
}
