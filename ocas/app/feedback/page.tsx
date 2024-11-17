'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { AiOutlineArrowLeft } from 'react-icons/ai'

export default function FeedbackSubmission() {
  const router = useRouter()
  const { toast } = useToast()
  const [orderNumber, setOrderNumber] = useState('')
  const [rating, setRating] = useState('')
  const [feedbackType, setFeedbackType] = useState('')
  const [comments, setComments] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the feedback to your backend
    console.log({ orderNumber, rating, feedbackType, comments })
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
    // Reset form
    setOrderNumber('')
    setRating('')
    setFeedbackType('')
    setComments('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white p-8">
      <Button
        variant="ghost"
        onClick={() => router.push('/dashboard')}
        className="mb-8 flex items-center text-purple-600 hover:text-purple-800"
      >
        <AiOutlineArrowLeft className="mr-2" /> Back to Dashboard
      </Button>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-purple-800">Feedback Submission</CardTitle>
          <CardDescription>We value your opinion! Please share your thoughts on your recent order.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="orderNumber">Order Number</Label>
              <Input
                id="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Enter your order number"
                required
              />
            </div>

            <div>
              <Label>How would you rate your experience?</Label>
              <RadioGroup value={rating} onValueChange={setRating} className="flex space-x-4 mt-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex items-center space-x-2">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                    <Label htmlFor={`rating-${value}`}>{value}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="feedbackType">Feedback Type</Label>
              <Select value={feedbackType} onValueChange={setFeedbackType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food-quality">Food Quality</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="app-experience">App Experience</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comments">Additional Comments</Label>
              <Textarea
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Please provide any additional comments or suggestions"
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Submit Feedback
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}