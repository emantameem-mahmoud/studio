"use client";

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WandSparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { handleGenerateStory } from '@/app/actions';

const formSchema = z.object({
  category: z.string({ required_error: "الرجاء اختيار فئة." }),
});

const storyCategories = [
    { value: 'perseverance', label: 'المثابرة' },
    { value: 'teamwork', label: 'العمل الجماعي' },
    { value: 'creativity', label: 'الإبداع' },
];

export function StoryGenerator() {
    const [isPending, startTransition] = useTransition();
    const [story, setStory] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setError(null);
        setStory(null);
        startTransition(async () => {
            const result = await handleGenerateStory(values);
            if (result.success) {
                setStory(result.success);
            } else {
                setError(result.error || 'حدث خطأ ما.');
            }
        });
    }

    return (
        <section id="story-generator">
            <Card className="shadow-lg h-full flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                            <WandSparkles className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-2xl">مولّد القصص الملهمة</CardTitle>
                            <CardDescription>اصنعي قصة قصيرة محفزة بضغطة زر!</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="flex-grow">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>اختاري موضوع القصة</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} dir="rtl">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="اختاري فئة..." />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {storyCategories.map(cat => (
                                                    <SelectItem key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending} className="w-full">
                                {isPending ? 'جاري الكتابة...' : 'اكتبي لي قصة!'}
                            </Button>
                        </form>
                    </Form>

                    {isPending && <p className="mt-4 text-center text-muted-foreground">يتم الآن نسج الكلمات...</p>}
                    {error && <p className="mt-4 text-center text-destructive">{error}</p>}
                    
                    {story && (
                        <div className="mt-6 p-4 border rounded-lg bg-background animate-in fade-in-50">
                            <h4 className="font-headline font-semibold mb-2">قصتك الجديدة:</h4>
                            <p className="text-foreground/90 whitespace-pre-wrap">{story}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
