import { Rocket } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const leaderboard = [
  { rank: 1, student: 'نورة', points: 1250, avatarId: 'avatar-1' },
  { rank: 2, student: 'فاطمة', points: 1100, avatarId: 'avatar-2' },
  { rank: 3, student: 'سارة', points: 980, avatarId: 'avatar-3' },
];

export function RewardsSystem() {
  return (
    <section id="rewards">
      <Card className="shadow-lg h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                <Rocket className="h-6 w-6 text-primary" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">نظام النقاط والمكافآت</CardTitle>
                <CardDescription>اجمعي النقاط وتصدري قائمة المتفوقات!</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">الترتيب</TableHead>
                <TableHead>الطالبة</TableHead>
                <TableHead className="text-left">النقاط</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboard.map((player) => {
                 const avatar = PlaceHolderImages.find(img => img.id === player.avatarId);
                 return (
                    <TableRow key={player.rank} className={player.rank === 1 ? 'bg-accent/20' : ''}>
                        <TableCell className="font-bold text-lg">{player.rank}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <Avatar className="w-8 h-8">
                                    {avatar && (
                                        <AvatarImage src={avatar.imageUrl} alt={player.student} data-ai-hint={avatar.imageHint} />
                                    )}
                                    <AvatarFallback>{player.student.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{player.student}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-left font-bold text-primary">{player.points}</TableCell>
                    </TableRow>
                 )
              })}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled>
            استبدال النقاط قريباً
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
