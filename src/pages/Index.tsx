import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

type Message = {
  id: number;
  user: string;
  avatar: string;
  text: string;
  time: string;
};

type Topic = {
  id: number;
  title: string;
  category: string;
  author: string;
  replies: number;
  views: number;
  lastActivity: string;
  pinned?: boolean;
  hot?: boolean;
};

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeChatRoom, setActiveChatRoom] = useState('general');
  const [chatMessage, setChatMessage] = useState('');

  const chatRooms = [
    { id: 'general', name: 'Общий чат', online: 245 },
    { id: 'trade', name: 'Торговля', online: 89 },
    { id: 'raids', name: 'Рейды', online: 156 },
    { id: 'newbies', name: 'Новички', online: 67 }
  ];

  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'ShadowReaper', avatar: 'SR', text: 'Кто готов на рейд в 22:00?', time: '18:32' },
    { id: 2, user: 'NeonHunter', avatar: 'NH', text: 'Я с вами! Лвл 45 танк', time: '18:33' },
    { id: 3, user: 'CyberMage', avatar: 'CM', text: 'Возьмите хилера плз', time: '18:34' },
    { id: 4, user: 'StormKnight', avatar: 'SK', text: 'Есть тима на арену 3х3?', time: '18:35' }
  ]);

  const topics: Topic[] = [
    {
      id: 1,
      title: 'Гайд: Лучшая сборка для PvP в сезоне 3',
      category: 'Гайды',
      author: 'ProGamer2024',
      replies: 342,
      views: 15420,
      lastActivity: '5 мин назад',
      pinned: true,
      hot: true
    },
    {
      id: 2,
      title: 'Обсуждение нового патча 2.5.1',
      category: 'Обсуждения',
      author: 'GameMaster',
      replies: 891,
      views: 23150,
      lastActivity: '12 мин назад',
      hot: true
    },
    {
      id: 3,
      title: 'Турнир на 100,000₽ - регистрация открыта!',
      category: 'События',
      author: 'TournamentBot',
      replies: 156,
      views: 8940,
      lastActivity: '1 час назад',
      pinned: true
    },
    {
      id: 4,
      title: 'Поделитесь своими билдами класса "Призрак"',
      category: 'Обсуждения',
      author: 'ShadowWalker',
      replies: 78,
      views: 2340,
      lastActivity: '2 часа назад'
    },
    {
      id: 5,
      title: 'Лучшие моменты прошедшего турнира',
      category: 'Новости',
      author: 'NewsWriter',
      replies: 45,
      views: 1890,
      lastActivity: '3 часа назад'
    }
  ];

  const topPlayers = [
    { rank: 1, name: 'DarkLord', rating: 3540, change: '+120' },
    { rank: 2, name: 'PhoenixFire', rating: 3421, change: '+85' },
    { rank: 3, name: 'IceQueen', rating: 3398, change: '-15' },
    { rank: 4, name: 'ThunderStrike', rating: 3276, change: '+45' },
    { rank: 5, name: 'VoidWalker', rating: 3201, change: '+92' }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        user: 'Вы',
        avatar: 'ВЫ',
        text: chatMessage,
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');
    }
  };

  const navItems = [
    { id: 'home', label: 'Главная', icon: 'Home' },
    { id: 'news', label: 'Новости', icon: 'Newspaper' },
    { id: 'admin-apply', label: 'Заявка на админа', icon: 'Shield' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center animate-glow">
              <span className="text-white font-bold text-xl">V</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              VUSS RUSSIA FORUM
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Icon name="Bell" size={18} className="mr-2" />
              Уведомления
            </Button>
            <Avatar className="cursor-pointer ring-2 ring-primary/20 hover:ring-primary/50 transition-all">
              <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                ВЫ
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 space-y-4">
            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Навигация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveSection(item.id)}
                  >
                    <Icon name={item.icon as any} size={18} className="mr-3" />
                    {item.label}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>Топ игроков</span>
                  <Icon name="TrendingUp" size={18} className="text-secondary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topPlayers.map((player) => (
                  <div key={player.rank} className="flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        player.rank === 1 ? 'bg-yellow-500' : player.rank === 2 ? 'bg-gray-400' : player.rank === 3 ? 'bg-orange-600' : 'bg-muted'
                      }`}>
                        {player.rank}
                      </div>
                      <span className="text-sm font-medium">{player.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-accent">{player.rating}</div>
                      <div className={`text-xs ${player.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {player.change}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>

          <main className="flex-1 space-y-6">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-card/50 backdrop-blur overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
              <CardHeader>
                <CardTitle className="text-3xl">Добро пожаловать в мир VUSS RUSSIA</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Присоединяйся к крупнейшему игровому сообществу. Делись опытом, участвуй в турнирах, находи команду!
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all cursor-pointer animate-slide-up">
                    <Icon name="Users" size={24} className="text-primary mb-2" />
                    <div className="text-2xl font-bold">15,420</div>
                    <div className="text-sm text-muted-foreground">Активных игроков</div>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20 hover:bg-secondary/20 transition-all cursor-pointer animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <Icon name="MessageSquare" size={24} className="text-secondary mb-2" />
                    <div className="text-2xl font-bold">8,934</div>
                    <div className="text-sm text-muted-foreground">Тем обсуждений</div>
                  </div>
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20 hover:bg-accent/20 transition-all cursor-pointer animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <Icon name="Trophy" size={24} className="text-accent mb-2" />
                    <div className="text-2xl font-bold">342</div>
                    <div className="text-sm text-muted-foreground">Турниров проведено</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {activeSection === 'admin-apply' ? (
                  <Card className="border-primary/30 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Icon name="Shield" size={28} className="text-primary" />
                        Заявка на администратора
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Заполните форму ниже, чтобы подать заявку на должность администратора сервера
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Ваш никнейм в игре</label>
                        <Input placeholder="Например: ShadowReaper" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Возраст</label>
                        <Input type="number" placeholder="18" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Discord</label>
                        <Input placeholder="username#0000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Опыт администрирования</label>
                        <textarea 
                          className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                          placeholder="Расскажите о вашем опыте администрирования на других серверах..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Почему вы хотите стать администратором?</label>
                        <textarea 
                          className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                          placeholder="Опишите вашу мотивацию..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Сколько времени в день вы готовы уделять?</label>
                        <Input placeholder="Например: 3-5 часов" />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                          <Icon name="Send" size={18} className="mr-2" />
                          Отправить заявку
                        </Button>
                        <Button variant="outline" onClick={() => setActiveSection('home')}>
                          Отмена
                        </Button>
                      </div>
                      <div className="mt-6 p-4 rounded-lg bg-muted/50 border border-border/50">
                        <div className="flex gap-2 mb-2">
                          <Icon name="Info" size={18} className="text-accent flex-shrink-0 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-semibold mb-1">Требования к кандидатам:</p>
                            <ul className="space-y-1 text-muted-foreground">
                              <li>• Возраст от 18 лет</li>
                              <li>• Игровой стаж более 6 месяцев</li>
                              <li>• Активность минимум 3 часа в день</li>
                              <li>• Знание правил сервера</li>
                              <li>• Стрессоустойчивость и адекватность</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : activeSection === 'news' ? (
                  <Card className="border-border/50 bg-card/50 backdrop-blur">
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Icon name="Newspaper" size={28} className="text-secondary" />
                        Новости VUSS RUSSIA
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Последние обновления и события из мира игры
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Раздел новостей находится в разработке</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">Горячие темы</h2>
                      <Button variant="outline" size="sm">
                        <Icon name="Plus" size={18} className="mr-2" />
                        Создать тему
                      </Button>
                    </div>

                    {topics.map((topic, index) => (
                  <Card 
                    key={topic.id} 
                    className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/50 transition-all cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {topic.pinned && (
                              <Icon name="Pin" size={16} className="text-primary" />
                            )}
                            {topic.hot && (
                              <Icon name="Flame" size={16} className="text-secondary" />
                            )}
                            <Badge variant="outline" className="text-xs">
                              {topic.category}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="User" size={14} />
                              <span>{topic.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="MessageSquare" size={14} />
                              <span>{topic.replies}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Eye" size={14} />
                              <span>{topic.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              <span>{topic.lastActivity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                  </>
                )}
              </div>

              <div className="space-y-4">
                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">Чаты</CardTitle>
                      <Badge variant="secondary" className="animate-pulse">
                        LIVE
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 pb-3">
                    {chatRooms.map((room) => (
                      <Button
                        key={room.id}
                        variant={activeChatRoom === room.id ? 'default' : 'ghost'}
                        className="w-full justify-between"
                        onClick={() => setActiveChatRoom(room.id)}
                      >
                        <span className="flex items-center gap-2">
                          <Icon name="MessageCircle" size={16} />
                          {room.name}
                        </span>
                        <Badge variant="outline" className="ml-2">
                          {room.online}
                        </Badge>
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-border/50 bg-card/50 backdrop-blur">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      {chatRooms.find(r => r.id === activeChatRoom)?.name}
                    </CardTitle>
                  </CardHeader>
                  <Separator />
                  <ScrollArea className="h-[300px] p-4">
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className="flex gap-3 animate-fade-in">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-primary/20 to-accent/20">
                              {msg.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{msg.user}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <Separator />
                  <CardContent className="pt-3 pb-3">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Написать сообщение..."
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button size="icon" onClick={handleSendMessage}>
                        <Icon name="Send" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;