import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsUUID } from 'class-validator';
import { TSubscriberDto } from '../../../subscribers/all-subscribers-map';
import { SubscriberTypeEnum } from '../../../subscribers/subscriber-type.enum';

export class RegisterSubscriberDto implements TSubscriberDto<SubscriberTypeEnum> {
    @ApiProperty({
        enum: SubscriberTypeEnum,
    })
    @IsEnum(SubscriberTypeEnum)
    type: SubscriberTypeEnum;

    @ApiProperty({
        type: [String],
    })
    @IsUUID('all', { each: true })
    @IsArray()
    serviceIds: [string];
}
