import { YMaps } from '@pbe/react-yandex-maps';
import "@/assets/styles/YMap.css";
import GeocodeMap from '@/components/features/Map/GeocodeMap';
import RightPanel from '@/components/RightPanel';
import { useRef, useState, useMemo, useEffect } from 'react';
import CampusMap from '@/components/features/Building/BuildingMap';
import BuildingService from '@/services/api/BuildingService';
import BuildingCard from '@/components/features/Building/BuildingCard';
import '@/assets/styles/LeftPanel.css';
import { TabsBox, Tab } from '@/components/ui/TabsBox';
import type Building from '@/types/building/Building';
import { faBarsStaggered, faBookmark, faCalendarAlt, faFire, faHome, faQuestionCircle, faUniversity } from '@fortawesome/free-solid-svg-icons';
import "@/assets/styles/Main.css";
import { HistoryCard } from '@/components/features/Card/HistoryCard';
import { QuestionCard } from '@/components/features/Card/QuestionCard';
import { LessonCard } from '@/components/features/Card/LessonCard';
import RoutesService from '@/services/api/RoutesService';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';
import '@/components/ui/CollapsibleSection.css';

export default function Get() {
  const allBuildings = BuildingService.getAll();
  const [isLoaded, setIsLoaded] = useState(false);

  const mapRef = useRef<any>(null);
  const [activeBuildingId, setActiveBuildingId] = useState<number | null>(null);
  const [activeBuilding, setActiveBuilding] = useState<Building | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleGetLocation = async () => { };


  useEffect(() => {
    BuildingService.init().then(() =>
      RoutesService.init().then(() => setIsLoaded(true))
    );
  }, [RoutesService]);

  const handleJoin = (id: number) => {
    const newBuilding = BuildingService.getById(id);
    if (newBuilding) {
      BuildingService.setActive(newBuilding);
      setActiveBuildingId(newBuilding.id);
    }
  };

  useEffect(() => {
    setActiveBuilding(BuildingService.activeBuilding)
  }, [BuildingService.activeBuilding])

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const filteredIds = useMemo(() => {
    if (!searchValue.trim()) return allBuildings.map(b => b.id);

    return allBuildings
      .filter(b =>
        b.name.toLowerCase().includes(searchValue) ||
        b.description?.toLowerCase().includes(searchValue)
      )
      .map(b => b.id);
  }, [searchValue, allBuildings]);

  useEffect(() => {
    if (filteredIds.length === 1) {
      setActiveBuildingId(filteredIds[0]);
    } else {
      setActiveBuildingId(null);
    }
  }, [filteredIds]);

  if (!isLoaded) return null;

  return (
    <>
      <div id="left-panel">
        <TabsBox defaultTab='main'>
          <Tab id='main' label='Главная' icon={faHome}>
            <div style={{ paddingTop: '16px' }}>
              <input
                id="buildingSearch"
                type="search"
                placeholder="Поиск..."
                style={{ marginBottom: '16px' }}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <HistoryCard
                  name="1 корпус"
                  address="ун. им. М. Козыбаева, ул. Жабаева 1000">
                </HistoryCard>
              </div>
            </div>
          </Tab>
          <Tab id='university' label='Здания' icon={faUniversity}>
            <div style={{ paddingTop: '16px' }}>
              <input
                id="buildingSearch"
                type="search"
                onChange={handleInput}
                placeholder="Поиск..."
                style={{ marginBottom: '16px' }}
              />
              <div id="buildingResults" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {allBuildings.map(building => {
                  const isShown = filteredIds.includes(building.id);
                  return (
                    <BuildingCard
                      key={building.id}
                      building={building}
                      shown={isShown}
                      active={activeBuildingId === building.id}
                      onSelect={handleJoin}
                    />
                  );
                })}
              </div>
            </div>
          </Tab>
          <Tab id='schedule' label='Учеба' icon={faCalendarAlt}>
            <div style={{ padding: '16px' }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: '700', 
                color: 'var(--kutg-color)', 
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid rgba(var(--kutg-color-for-rgba), 0.15)'
              }}>
                Моё расписание
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <LessonCard
                lesson={{
                  name: "Проектирование надежных компьютерных систем-лекц",
                  time: "9:30 - 10:20",
                  room: "405/УЛК",
                  teacher: "маг., ст.пр. Пяткова Т.В."
                }}
              />
              <LessonCard
                lesson={{



                  name: "Системы искусственного интеллекта-лекц",
                  time: "10:30 - 11:20",
                  room: "636/УЛК",
                  teacher: "док PhD, доц. Астапенко Н.В."
                }}
              />
              <LessonCard
                lesson={{
                  name: "Информационная безопасность-лекц",
                  time: "11:30 - 12:20",
                  room: "636/УЛК",
                  teacher: "маг., ст.пр. Семенюк В.В."
                }}
              />
              <LessonCard
                lesson={{
                  name: "Проектирование программного обеспечения-лекц",
                  time: "12:50 - 13:40",
                  room: "413/УЛК",
                  teacher: "маг., ст.пр. Пяткова Т.В."
                }}
              />
              <LessonCard
                lesson={{
                  name: "Управление разработкой программного обеспечения-лекц",
                  time: "13:50 - 14:40",
                  room: "413/УЛК",
                  teacher: "маг., ст.пр. Пяткова Т.В."
                }}
              />
              <LessonCard
                lesson={{
                  name: "Управление разработкой программного обеспечения-лаб",
                  time: "14:50 - 15:40",
                  room: "324/6",
                  teacher: "Мунтинов к.Д."
                }}
              />
              <LessonCard
                lesson={{
                  name: "Управление разработкой программного обеспечения-лаб",
                  time: "15:50 - 16:40",
                  room: "324/6",
                  teacher: "Мунтинов к.Д."
                }}
              />
              </div>
            </div>
          </Tab>
          <Tab id='popular' label='Частое' icon={faFire}>
          </Tab>
          <Tab id='bookmarks' label='Закладки' icon={faBookmark}>
          </Tab>
          <Tab id='help' label='Помощь' icon={faQuestionCircle}>
            <div>
              <CollapsibleSection title="Документы и справки">
                <QuestionCard
                  question="Где получить справку с места учебы?"
                  answer="Справку с места учебы вы можете получить в деканате вашего факультета. При себе необходимо иметь студенческий билет. Справка изготавливается в течение 1-3 рабочих дней."
                />
                
                <QuestionCard
                  question="Как получить справку для военкомата?"
                  answer="Справка для военкомата выдается в деканате. Вам необходимо написать заявление, приложить документ из военкомата. Обычно справка готова через 2-3 рабочих дня."
                />
                
                <QuestionCard
                  question="Где оформить прописку для иностранных студентов?"
                  answer="Для оформления прописки иностранным студентам необходимо обратиться в отдел по работе с иностранными студентами (ОРИС) в главном корпусе. При себе нужно иметь паспорт, визу и документы о заселении в общежитие."
                />
                
                <QuestionCard
                  question="Куда отнести документ о прикрепленной поликлиники?"
                  answer="Документ о прикреплении к поликлинике необходимо отнести в медицинский кабинет университета (корпус №1, 2 этаж) или передать в деканат. Документ будет внесен в вашу личную карту студента."
                />
                
                <QuestionCard
                  question="Куда отнести флюорографию?"
                  answer="Результаты флюорографии принимаются в медицинском кабинете университета (корпус №1, 2 этаж). При себе необходимо иметь результаты флюорографии и студенческий билет. Анализ принимается только с отметкой о прохождении в текущем учебном году."
                />
              </CollapsibleSection>

              <CollapsibleSection title="Обучение и сессия">
                <QuestionCard
                  question="Что делать если я завалил экзамен?"
                  answer="Если вы не сдали экзамен, у вас есть возможность пересдачи. Необходимо обратиться к преподавателю для согласования даты пересдачи. Пересдача должна быть организована в установленные сроки перед началом следующего семестра."
                />
                
                <QuestionCard
                  question="Какой балл нужен для допуска к сессии?"
                  answer="Для допуска к сессии необходимо набрать минимум 50 баллов по сумме всех видов работ (текущий контроль, домашние задания, лабораторные работы). Если баллов недостаточно, вам нужно закрыть задолженности до начала экзаменационной сессии."
                />
                
                <QuestionCard
                  question="Как узнать свою задолженность по обучению?"
                  answer="Задолженность по обучению можно узнать в личном кабинете студента в системе Moodle или обратившись в деканат вашего факультета. Также вы можете посмотреть в приложении MyNKU в разделе 'Успеваемость'."
                />
                
                <QuestionCard
                  question="Что такое рейтинговая система и кредиты?"
                  answer="Рейтинговая система оценивает вашу работу в течение семестра. Максимально можно набрать 100 баллов. Кредиты - это единицы учебной нагрузки (1 кредит = 1 кредитному часу). Для получения стипендии нужно поддерживать определенный рейтинг (обычно выше 3.0)."
                />
                
                <QuestionCard
                  question="Как получить красный диплом?"
                  answer="Для получения диплома с отличием (красного) необходимо иметь не менее 75% оценок 'отлично' за весь период обучения, остальные - не ниже 'хорошо'. Не допускается оценка 'удовлетворительно' ни по одному предмету."
                />
                
                <QuestionCard
                  question="Как перевестись на другую специальность или направление?"
                  answer="Перевод осуществляется по заявлению в деканат с приложением академической справки. Необходимо согласование с деканатом нового направления и соответствие требованиям (средний балл, наличие вакантных мест). Перевод возможен после первой сессии при условии академической успеваемости."
                />
                
                <QuestionCard
                  question="Как отчислиться из университета?"
                  answer="Для отчисления необходимо написать заявление в деканат с указанием причины. Для получения документов необходимо закрыть все задолженности и сдать студенческий билет. Академическую справку выдадут в течение 7-10 рабочих дней."
                />
                
                <QuestionCard
                  question="Как взять академический отпуск?"
                  answer="Академический отпуск предоставляется по медицинским показаниям, семейным обстоятельствам или призыву в армию. Необходимо написать заявление в деканат, приложить подтверждающие документы. Максимальная продолжительность - 2 года за весь период обучения."
                />
                
                <QuestionCard
                  question="Что делать если мне нужно уехать на пару дней?"
                  answer="При необходимости отсутствия на занятиях более 3 дней следует заранее получить разрешение в деканате. При кратковременном отсутствии (1-2 дня) достаточно предупредить старосту группы и договориться с преподавателями о задолженностях."
                />
              </CollapsibleSection>

              <CollapsibleSection title="Оплата и стипендии">
                <QuestionCard
                  question="Как оплатить обучение со специального счета?"
                  answer="Оплату со специального счета можно произвести через онлайн-банкинг или в отделении банка. Необходимо в назначении платежа указать ФИО, номер договора и период оплаты. После оплаты предоставьте платежный документ в финансовый отдел (корпус №1, каб. 105)."
                />
                
                <QuestionCard
                  question="Куда отнести реквизиты карты для получения стипендии?"
                  answer="Реквизиты банковской карты необходимо предоставить в деканат вашего факультета. Реквизиты принимаются в электронном виде или на бумажном носителе. Убедитесь, что карта оформлена на ваше имя. Стипендия перечисляется до 25 числа каждого месяца."
                />
                
                <QuestionCard
                  question="Какие стипендии выплачиваются в университете?"
                  answer="Университет выплачивает несколько видов стипендий: академическая (для успевающих студентов), социальная (для нуждающихся), именные стипендии президента/попечительского совета. Размер зависит от успеваемости и бюджета университета. Положения о стипендиях публикуются на сайте."
                />
                
                <QuestionCard
                  question="Есть ли скидки на обучение?"
                  answer="Да, в университете действуют различные программы поддержки: скидки для студентов с высоким рейтингом, льготы многодетным семьям, программы социальной поддержки. Подробную информацию можно узнать в финансовом отделе или в приемной комиссии."
                />
              </CollapsibleSection>

              <CollapsibleSection title="Быт и удобства">
                <QuestionCard
                  question="Как получить доступ к бассейну и каковы цены?"
                  answer="Для доступа к бассейну необходимо получить медицинскую справку о допуске к занятиям плаванием. Льготные цены доступны при предъявлении студенческого билета (скидка до 50%). Абонемент оформляется в спортивном комплексе. Стоимость: для студентов ~2000₸/месяц, разовое посещение ~500₸."
                />
                
                <QuestionCard
                  question="Как записаться на спортивные секции?"
                  answer="Запись на спортивные секции происходит в отделе физической культуры (корпус №2, 1 этаж) или через старосту группы. Предоставляются секции по баскетболу, волейболу, футболу, настольному теннису, шахматам и другие. Занятия бесплатны для студентов."
                />
                
                <QuestionCard
                  question="Где найти туалет в университете?"
                  answer="Туалеты находятся на каждом этаже всех корпусов. Обычно они расположены в конце коридоров. На каждом этаже есть информационная табличка с указанием направления. Также вы можете воспользоваться интерактивной картой в мобильном приложении KU Travel Guide."
                />
                
                <QuestionCard
                  question="Как получить читальный билет в библиотеке?"
                  answer="Для получения читательского билета обращайтесь в главную библиотеку (корпус №1, 3 этаж). При себе иметь студенческий билет и фотографию 3x4. Билет выдается в течение одного рабочего дня. С ним вы получаете доступ к читальным залам и электронным ресурсам."
                />
                
                <QuestionCard
                  question="Что делать если я потерял карту доступа в корпус?"
                  answer="В случае потери карты доступа обратитесь в отдел обеспечения безопасности (главная охрана, корпус №1) или в деканат. Необходимо написать заявление о выдаче новой карты. Временный пропуск выдается на период изготовления новой карты. Стоимость перевыпуска: 500₸."
                />
              </CollapsibleSection>

              <CollapsibleSection title="Дополнительные возможности">
              <QuestionCard
                  question="Как поступить на дуальное обучение?"
                  answer="Дуальное обучение - это совмещение учебы и работы на предприятии. Для поступления подайте заявление в деканат не позднее окончания первого курса. Необходимо подтверждение от работодателя о готовности принять студента. Учебный план корректируется с учетом рабочего графика. Вопросы по дуальному обучению: 8 (7132) 35-21-45."
              />
                
              <QuestionCard
                  question="Что такое дуальное обучение?"
                  answer="Дуальное обучение - это образовательная модель, при которой студент изучает теорию в университете, а практические навыки получает на реальном рабочем месте. Это позволяет совмещать учебу с работой по специальности, получать практический опыт и зарплату одновременно. Обычно 2-3 дня в неделю студент на производстве, остальное время - в университете."
              />
                
              <QuestionCard
                  question="Как уехать на обучение по программе мобильности?"
                  answer="Для участия в программе академической мобильности необходимо: иметь высокий средний балл (не ниже 3.5), владеть иностранным языком на уровне B2, подать заявление в отдел международных связей (корпус №1, каб. 401). Программы действуют с вузами-партнерами в разных странах. Срок подачи: до 1 декабря каждого года."
              />
                
              <QuestionCard
                  question="Что такое грант и нужно ли его отрабатывать?"
                  answer="Грант - это государственное финансирование обучения на безвозмездной основе или с льготным пакетом. При получении гранта обычно заключается договор о целевом обучении, согласно которому выпускник обязан отработать не менее 3 лет по специальности в определенной организации, иначе грант нужно вернуть."
              />
                
              <QuestionCard
                  question="Где находится военная кафедра?"
                  answer="Военная кафедра расположена в отдельном здании на территории университета. Студенты призывного возраста могут получить военно-учетную специальность. Прием документов: с мая по сентябрь. Подробную информацию можно получить в деканате или по телефону: 8 (7132) 35-22-11. Для зачисления необходима медицинская комиссия."
                />
                
                <QuestionCard
                  question="Как проложить маршрут до аудитории?"
                  answer="Чтобы проложить маршрут до аудитории, выберите здание на карте или в списке зданий, затем укажите вашу текущую позицию и пункт назначения. Система автоматически рассчитает оптимальный маршрут с учетом лестниц, лифтов и доступных коридоров."
                />
              </CollapsibleSection>
            </div>

          </Tab>
          <Tab id='hide' label='Скрыть' icon={faBarsStaggered}>
          </Tab>
        </TabsBox>
      </div >

      {!activeBuilding && (
        <YMaps>
          <div className="map-container">
            <GeocodeMap />
          </div>
        </YMaps>
      )
      }

      {activeBuilding && <CampusMap />}

      <RightPanel
        onZoomIn={() => mapRef.current?.zoomIn()}
        onZoomOut={() => mapRef.current?.zoomOut()}
        onGetLocation={handleGetLocation}
      />
    </>
  );
}
