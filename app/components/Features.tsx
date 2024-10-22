import { CloudRain } from "lucide-react"

const features = [
  {
    name: 'Sign up for free',
    description: 'No monthly cost, no credit card needed, just event scheduling and calendar logistic.',
    icon: CloudRain,
  },
  {
    name: 'Blazing fast',
    description: 'The communication between server and client is extremely fast due to the architechture of the website',
    icon: CloudRain,
  },
  {
    name: 'Super secure with Nylas',
    description: 'We rely on Nylas in order to have incredibly secure data management and backend communication.',
    icon: CloudRain,
  },
  {
    name: 'Superior Database',
    description: 'With the combination of Prisma and Supabase you can get all the benefits of both services without giving up performance.',
    icon: CloudRain,
  }
]

export function Features(){
  return(
    <div className="py-24">
      <div className="max-2-2xl mx-auto lg:text-center">
        <div>
          <p className="font-semibold leading-7 text-primary">Schedule Faster</p>
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-thight sm:text-4xl">Schedule meetings in minutes!</h1>
        <p className="mt-6 text-base text-muted-foreground leading-snug">The meetings are very fast and easy to schedule between you and your clients</p>
      </div>

      <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-2-4xl">
        <div className="grid max-2-xl gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-16">
              <div className="text-base font-medium leading-7">
                <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-primary">
                  <feature.icon className="size-6 text-white"/>
                </div>
                {feature.name}
              </div>
              <p className="text-sm mt-2 text-muted-foreground leading-snug">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
