import {
    IntersectionType, OmitType, PartialType, PickType,
} from '@nestjs/swagger';
import { InspectedServiceApiEntity } from '../common/inspected-service.api-entity';

export class CreateInspectedServiceDto extends IntersectionType(
    OmitType(InspectedServiceApiEntity, ['id', 'method']),
    PartialType(PickType(InspectedServiceApiEntity, ['method'])),
) { }
