import type { ClubApplication } from '@/types';

export const mockApplications: ClubApplication[] = [
    {
        id: 'app-1',
        clubName: 'Velocity Sports Club',
        contactPerson: {
            name: 'Иван Петров',
            email: 'ivan.petrov@velocity.ru',
            phone: '+7 (495) 111-22-33',
        },
        location: {
            city: 'Москва',
            address: 'ул. Спортивная, 12',
        },
        sportTypes: ['fitness', 'swimming'],
        membersCount: 300,
        description: 'Многофункциональный спортивный клуб с бассейном и тренажерным залом',
        status: 'pending',
        submittedDate: '2024-11-20',
    },
    {
        id: 'app-2',
        clubName: 'Dragon Martial Arts',
        contactPerson: {
            name: 'Алексей Смирнов',
            email: 'a.smirnov@dragonma.ru',
            phone: '+7 (812) 222-33-44',
        },
        location: {
            city: 'Санкт-Петербург',
            address: 'ул. Боевая, 88',
        },
        sportTypes: ['martial_arts', 'boxing'],
        membersCount: 150,
        description: 'Школа восточных единоборств с опытными мастерами',
        status: 'pending',
        submittedDate: '2024-11-22',
    },
    {
        id: 'app-3',
        clubName: 'FlexYoga Studio',
        contactPerson: {
            name: 'Мария Иванова',
            email: 'maria@flexyoga.ru',
            phone: '+7 (343) 333-44-55',
        },
        location: {
            city: 'Екатеринбург',
            address: 'ул. Мира, 45',
        },
        sportTypes: ['yoga'],
        membersCount: 80,
        description: 'Уютная студия йоги в центре города',
        status: 'approved',
        submittedDate: '2024-11-15',
        reviewedDate: '2024-11-18',
        reviewedBy: 'Администратор',
    },
    {
        id: 'app-4',
        clubName: 'Street Basketball Arena',
        contactPerson: {
            name: 'Дмитрий Козлов',
            email: 'd.kozlov@streetball.ru',
            phone: '+7 (846) 444-55-66',
        },
        location: {
            city: 'Самара',
            address: 'ул. Спортивная, 99',
        },
        sportTypes: ['basketball'],
        membersCount: 120,
        description: 'Площадка для уличного баскетбола',
        status: 'rejected',
        submittedDate: '2024-11-10',
        reviewedDate: '2024-11-12',
        reviewedBy: 'Администратор',
        rejectionReason: 'Недостаточная инфраструктура',
    },
    {
        id: 'app-5',
        clubName: 'Ultimate CrossFit Box',
        contactPerson: {
            name: 'Сергей Волков',
            email: 's.volkov@ultimatecf.ru',
            phone: '+7 (861) 555-66-77',
        },
        location: {
            city: 'Краснодар',
            address: 'ул. Силовая, 34',
        },
        sportTypes: ['crossfit', 'fitness'],
        membersCount: 200,
        description: 'Кроссфит-бокс с современным оборудованием',
        status: 'pending',
        submittedDate: '2024-11-25',
    },
];
