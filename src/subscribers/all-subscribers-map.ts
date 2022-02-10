/* eslint-disable max-classes-per-file */
import { BaseSubscriber } from '../components/subscription/subscriber-declaration/base-subscriber';
import { BaseSubscriberWithServiceIdsDto } from '../components/subscription/subscriber-declaration/base-subscriber-with-service-ids.dto';
import { IOnMessage } from '../components/subscription/subscriber-declaration/onmessage.interface';
import { ConsoleSubscriber } from './console/console.subscriber';
import { EmailSubscriber } from './email/email.subscriber';
import { SmsSubscriber } from './sms-subscriber/sms.subscriber';
import { SubscriberTypeEnum } from './subscriber-type.enum';

type TSubscriberGetter<T extends SubscriberTypeEnum> = {
  get: (dto: BaseSubscriberWithServiceIdsDto<T>) => Promise<BaseSubscriber<T> & IOnMessage>
}

export type TSubscriberContract<T extends SubscriberTypeEnum> = {
  type: T,

  subscriber: TSubscriberGetter<T>,
};

export const ALL_SUBSCRIBERS_MAP: Record<SubscriberTypeEnum, TSubscriberContract<SubscriberTypeEnum>> = {
    console: {
        type: SubscriberTypeEnum.CONSOLE,
        subscriber: ConsoleSubscriber,
    },
    email: {
        subscriber: EmailSubscriber,
        type: SubscriberTypeEnum.EMAIL,
    },
    sms: {
        type: SubscriberTypeEnum.SMS,
        subscriber: SmsSubscriber,
    },
};
