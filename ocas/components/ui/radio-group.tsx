// "use client"

// import * as React from "react"
// import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
// import { Circle } from "lucide-react"

// import { cn } from "@/lib/utils"

// const RadioGroup = React.forwardRef<
//   React.ElementRef<typeof RadioGroupPrimitive.Root>,
//   React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
// >(({ className, ...props }, ref) => {
//   return (
//     <RadioGroupPrimitive.Root
//       className={cn("grid gap-2", className)}
//       {...props}
//       ref={ref}
//     />
//   )
// })
// RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

// const RadioGroupItem = React.forwardRef<
//   React.ElementRef<typeof RadioGroupPrimitive.Item>,
//   React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
// >(({ className, children, ...props }, ref) => {
//   return (
//     <RadioGroupPrimitive.Item
//       ref={ref}
//       className={cn(
//         "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
//         className
//       )}
//       {...props}
//     >
//       <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
//         <Circle className="h-2.5 w-2.5 fill-current text-current" />
//       </RadioGroupPrimitive.Indicator>
//     </RadioGroupPrimitive.Item>
//   )
// })
// RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// export { RadioGroup, RadioGroupItem }

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

// Now use a label outside the RadioGroupItem
const ProductPage = () => {
  return (
    <RadioGroup value="some-value">
      <div>
        <RadioGroupItem value="option1" id="option1">
          {/* Radio Button */}
        </RadioGroupItem>
        <label htmlFor="option1">Option 1 Label</label> {/* Label for Option 1 */}
      </div>
      <div>
        <RadioGroupItem value="option2" id="option2">
          {/* Radio Button */}
        </RadioGroupItem>
        <label htmlFor="option2">Option 2 Label</label> {/* Label for Option 2 */}
      </div>
    </RadioGroup>
  )
}

export { RadioGroup, RadioGroupItem }
