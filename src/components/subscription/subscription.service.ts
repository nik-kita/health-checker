import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonitoringService } from '../inspected-service/monitoring/monitoring.service';
import { ISubMonitoring } from '../inspected-service/monitoring/sub-monitoring.interface';
import { SubscriptionDbEntity } from './common/subscription.db-entity';
import { RegisterSubscriberDto } from './dto/register-subscriber.dto';

@Injectable()
export class SubscriptionService {
    private subMonitor: ISubMonitoring;

    constructor(
        monitoringService: MonitoringService,
        @InjectRepository(SubscriptionDbEntity)
        private subscriptionRepository: Repository<SubscriptionDbEntity>,
    ) {
        this.subMonitor = monitoringService;
    }

    public async addMoreServices(serviceIds: [string], subscriberId: string) {
        return this.registerOrAddMore(serviceIds, subscriberId);
    }

    private async registerOrAddMore(serviceIds: [string], subscriberIdOrData: string | Omit<RegisterSubscriberDto, 'serviceIds'>) {
        let subscription: SubscriptionDbEntity;
        if (typeof subscriberIdOrData !== 'string') {
            subscription = await this.subscriptionRepository.save({
                type: subscriberIdOrData.type,
                constructorPayload: JSON.stringify(subscriberIdOrData),
                services: serviceIds,
            });
        } else {
            subscription = await this.subscriptionRepository.save({
                id: subscriberIdOrData,
                services: serviceIds,
            });
        }

        this.subMonitor.subscribe(
            serviceIds,
            subscription.id,
          JSON.parse(subscription.constructorPayload) as RegisterSubscriberDto,
        );
    }

    public async registerSubscription(data: RegisterSubscriberDto) {
        const { serviceIds, ...constructorPayload } = data;

        return this.registerOrAddMore(serviceIds, constructorPayload);
    }

    public async unsubscribe(subscriberId: string, serviceIds?: [string]) {
        if (serviceIds) {
            this.subMonitor.unsubscribe(serviceIds, subscriberId);

            return;
        }

        this.subMonitor.unsubscribeAll(subscriberId);
    }
}
