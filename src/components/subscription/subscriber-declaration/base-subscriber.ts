import { HealthReportResDto } from '../../../general/health-report.res.dto';
import { TSubscriberDto } from '../../../subscribers/all-subscribers-map';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export type TOnmessage = (message: HealthReportResDto) => void;
export class BaseSubscriber<T extends SubscriberTypeEnum> {
    public static async get(dto: TSubscriberDto<SubscriberTypeEnum>) {
        return Promise.resolve(new BaseSubscriber(dto.type));
    }

    protected constructor(public type: T) { }
}
