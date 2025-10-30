"use client";

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { MessageSquarePlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { handleFeedbackSubmit } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const feedbackSchema = z.object({
  role: z.enum(["student", "teacher"], { required_error: "الرجاء تحديد صفتك." }),
  feedback: z.string().min(10, { message: 'يجب أن تكون الملاحظات 10 أحرف على الأقل.' }),
});

export function FeedbackForm() {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof feedbackSchema>>({
        resolver: zodResolver(feedbackSchema),
        defaultValues: {
            feedback: "",
        },
    });

    function onSubmit(values: z.infer<typeof feedbackSchema>) {
        startTransition(async () => {
            const result = await handleFeedbackSubmit(values);
            if (result.success) {
                toast({
                    title: "تم الإرسال بنجاح!",
                    description: result.success,
                });
                form.reset();
            } else {
                toast({
                    title: "خطأ في الإرسال",
                    description: result.error,
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <section id="feedback">
            <Card className="shadow-lg h-full flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                            <MessageSquarePlus className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-2xl">صندوق الملاحظات</CardTitle>
                            <CardDescription>رأيك يهمنا ويساعدنا على التطوير.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>أنا...</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex gap-4"
                                            >
                                                <FormItem className="flex items-center space-x-2 space-x-reverse">
                                                    <FormControl>
                                                        <RadioGroupItem value="student" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">طالبة</FormLabel>
                                                </FormItem>
                                                <FormItem className="flex items-center space-x-2 space-x-reverse">
                                                    <FormControl>
                                                        <RadioGroupItem value="teacher" />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">معلمة</FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="feedback"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ملاحظاتك</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="اكتبي ملاحظاتك أو اقتراحاتك هنا..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending} className="w-full">
                                {isPending ? 'جاري الإرسال...' : 'إرسال الملاحظات'}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    );
}
