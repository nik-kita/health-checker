import { createTransport, Transporter, TransportOptions } from 'nodemailer';
import { BaseSubscriber } from '../../components/subscription/subscriber-declaration/base-subscriber';
import { IOnMessage } from '../../components/subscription/subscriber-declaration/onmessage.interface';
import { HealthReportResDto } from '../../general/health-report.res.dto';
import { SubscriberTypeEnum } from '../subscriber-type.enum';
import { EmailSubscriberDto } from './emai-subscriber.dto';

export class EmailSubscriber extends BaseSubscriber<SubscriberTypeEnum.EMAIL> implements IOnMessage {
    public static transporter: Transporter;

    public transporter: Transporter | null;

    private emailOptions: Omit<EmailSubscriberDto, 'type'>;

    protected constructor(
        data: EmailSubscriberDto,
        transporter: Transporter | null,
    ) {
        const { type, ...emailOptions } = data;
        super(type);

        this.emailOptions = emailOptions;
        this.transporter = transporter;
    }

    async onMessage(this: EmailSubscriber, message: HealthReportResDto) {
        const { from, to } = this.emailOptions;

        (this.transporter || EmailSubscriber.transporter).sendMail({
            from,
            to: to.join(),
            subject: message.name,
            html: `<h1>${message.status}</h1><hr>${message.checkedUrl}`,
        });
    }

    public static async get(dto: EmailSubscriberDto): Promise<EmailSubscriber> {
        console.info(process.env.EMAIL_USER);
        console.info(dto);

        const user = dto.pass
            ? dto.user
            : process.env.EMAIL_USER;
        const pass = dto.pass
            ? dto.pass
            : process.env.EMAIL_PASSWORD;

        const transporter = dto.pass || EmailSubscriber.transporter
            ? await createTransport({
                service: 'gmail',
                auth: {
                    user,
                    pass,
                },
            } as TransportOptions)
            : EmailSubscriber.transporter;

        if (dto.pass) return new EmailSubscriber(dto, transporter);

        return new EmailSubscriber(dto, null);
    }
}
