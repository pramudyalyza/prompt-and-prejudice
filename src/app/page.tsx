"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Sparkles, Loader2, Shuffle, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Sample data for randomization
const sampleFirstNames = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Jackson",
  "Isabella",
  "Lucas",
  "Mia",
  "Aiden",
  "Harper",
  "Caden",
  "Amelia",
  "Grayson",
  "Evelyn",
  "Mason",
  "Abigail",
  "Elijah",
  "Emily",
  "Logan",
  "Elizabeth",
  "Carter",
  "Sofia",
  "Matthew",
  "Avery",
  "Benjamin",
  "Ella",
  "James",
  "Scarlett",
  "Alexander",
  "Grace",
  "Michael",
  "Chloe",
  "William",
  "Victoria",
  "Daniel",
  "Madison",
  "Henry",
  "Lily",
  "Joseph",
  "Hannah",
  "Samuel",
  "Aria",
  "Sebastian",
  "Zoe",
  "David",
  "Penelope",
  "Wyatt",
  "Riley",
  "Matthew",
  "Layla",
  "Jayden",
  "Nora",
  "John",
  "Zoey",
  "Owen",
  "Audrey",
  "Dylan",
  "Claire",
  "Luke",
  "Skylar",
  "Gabriel",
  "Bella",
  "Anthony",
  "Aurora",
  "Isaac",
  "Lucy",
  "Grayson",
  "Savannah",
  "Julian",
  "Brooklyn",
  "Levi",
  "Natalie",
  "Christopher",
  "Aaliyah",
  "Joshua",
  "Camila",
  "Andrew",
  "Allison",
  "Ryan",
  "Samantha",
  "Nathan",
  "Maya",
  "Aaron",
  "Gabriella",
  "Christian",
  "Anna",
  "Eli",
  "Sarah",
  "Jonathan",
  "Madelyn",
  "Connor",
  "Aubrey",
  "Jeremiah",
  "Arianna",
  "Cameron",
  "Genesis",
  "Josiah",
  "Kylie",
  "Adrian",
  "Kaylee",
  "Colton",
  "Sadie",
  "Jordan",
  "Autumn",
  "Brayden",
  "Hailey",
  "Nicholas",
  "Gianna",
  "Robert",
  "Valentina",
  "Angel",
  "Nevaeh",
  "Hudson",
  "Alexa",
  "Lincoln",
  "Stella",
  "Evan",
  "Violet",
  "Dominic",
  "Caroline",
  "Austin",
  "Mackenzie",
  "Ian",
  "Naomi",
  "Adam",
  "Kennedy",
  "Elias",
  "Ellie",
  "Jace",
  "Leah",
  "Jose",
  "Aubree",
  "Ezra",
  "Gabrielle",
  "Carson",
  "Alice",
  "Nolan",
  "Madeline",
  "Cooper",
  "Cora",
  "Easton",
  "Ruby",
  "Asher",
  "Eva",
  "Bentley",
  "Serenity",
  "Jason",
  "Autumn",
  "Chase",
  "Adeline",
  "Blake",
  "Hazel",
  "Xavier",
  "Willow",
  "Kayden",
  "Aaliyah",
  "Zachary",
  "Paisley",
  "Parker",
  "Nevaeh",
  "Ayden",
  "Kinsley",
  "Gavin",
  "Peyton",
  "Brody",
  "Maria",
  "Jaxson",
  "Melanie",
  "Sawyer",
  "Rylee",
  "Declan",
  "Reagan",
  "Leonardo",
]
const sampleLastNames = [
  "Smith",
  "Johnson",
  "Williams",
  "Jones",
  "Brown",
  "Davis",
  "Miller",
  "Wilson",
  "Moore",
  "Taylor",
  "Anderson",
  "Thomas",
  "Jackson",
  "White",
  "Harris",
  "Martin",
  "Thompson",
  "Garcia",
  "Martinez",
  "Robinson",
  "Clark",
  "Rodriguez",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "Hernandez",
]
const sampleNationalities = [
  "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Antiguans", "Argentinean", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Barbudans", "Batswana", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran",  "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djibouti", "Dominican", "Dutch", "Dutchman", "Dutchwoman", "East Timorese", "Ecuadorean", "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", "Herzegovinian", "Honduran", "Hungarian", "I-Kiribati", "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourger", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "Netherlander", "New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian or Tobagonian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean",
]
const sampleTraits = [
  "Introverted",
  "Extroverted",
  "Shy",
  "Cheerful",
  "Calm",
  "Playful",
  "Serious",
  "Confident",
  "Sensitive",
  "Optimistic",
  "Sarcastic",
  "Kind",
  "Loyal",
  "Romantic",
  "Mysterious",
  "Protective",
  "Insecure",
  "Ambitious",
  "Lazy",
  "Clumsy",
  "Charming",
  "Curious",
  "Quiet",
  "Talkative",
]
const sampleLocations = [
 'Andorra',
 'Afghanistan',
 'Antigua and Barbuda',
 'Albania',
 'Armenia',
 'Angola',
 'Argentina',
 'Austria',
 'Australia',
 'Azerbaijan',
 'Barbados',
 'Bangladesh',
 'Belgium',
 'Burkina Faso',
 'Bulgaria',
 'Bahrain',
 'Burundi',
 'Benin',
 'Brunei Darussalam',
 'Bolivia',
 'Brazil',
 'Bahamas',
 'Bhutan',
 'Botswana',
 'Belarus',
 'Belize',
 'Canada',
 'Democratic Republic of the Congo',
 'Republic of the Congo',
 "CÃ´te d'Ivoire",
 'Chile',
 'Cameroon',
 "People's Republic of China",
 'Colombia',
 'Costa Rica',
 'Cuba',
 'Cape Verde',
 'Cyprus',
 'Czech Republic',
 'Germany',
 'Djibouti',
 'Denmark',
 'Dominica',
 'Dominican Republic',
 'Ecuador',
 'Estonia',
 'Egypt',
 'Eritrea',
 'Ethiopia',
 'Finland',
 'Fiji',
 'France',
 'Gabon',
 'Georgia',
 'Ghana',
 'The Gambia',
 'Guinea',
 'Greece',
 'Guatemala',
 'Haiti',
 'Guinea-Bissau',
 'Guyana',
 'Honduras',
 'Hungary',
 'Indonesia',
 'Republic of Ireland',
 'Israel',
 'India',
 'Iraq',
 'Iran',
 'Iceland',
 'Italy',
 'Jamaica',
 'Jordan',
 'Japan',
 'Kenya',
 'Kyrgyzstan',
 'Kiribati',
 'North Korea',
 'South Korea',
 'Kuwait',
 'Lebanon',
 'Liechtenstein',
 'Liberia',
 'Lesotho',
 'Lithuania',
 'Luxembourg',
 'Latvia',
 'Libya',
 'Madagascar',
 'Marshall Islands',
 'Macedonia',
 'Mali',
 'Myanmar',
 'Mongolia',
 'Mauritania',
 'Malta',
 'Mauritius',
 'Maldives',
 'Malawi',
 'Mexico',
 'Malaysia',
 'Mozambique',
 'Namibia',
 'Niger',
 'Nigeria',
 'Nicaragua',
 'Kingdom of the Netherlands',
 'Norway',
 'Nepal',
 'Nauru',
 'New Zealand',
 'Oman',
 'Panama',
 'Peru',
 'Papua New Guinea',
 'Philippines',
 'Pakistan',
 'Poland',
 'Portugal',
 'Palau',
 'Paraguay',
 'Qatar',
 'Romania',
 'Russia',
 'Rwanda',
 'Saudi Arabia',
 'Solomon Islands',
 'Seychelles',
 'Sudan',
 'Sweden',
 'Singapore',
 'Slovenia',
 'Slovakia',
 'Sierra Leone',
 'San Marino',
 'Senegal',
 'Somalia',
 'Suriname',
 'SÃ£o TomÃ© and PrÃ\xadncipe',
 'Syria',
 'Togo',
 'Thailand',
 'Tajikistan',
 'Turkmenistan',
 'Tunisia',
 'Tonga',
 'Turkey',
 'Trinidad and Tobago',
 'Tuvalu',
 'Tanzania',
 'Ukraine',
 'Uganda',
 'United States',
 'Uruguay',
 'Uzbekistan',
 'Vatican City',
 'Venezuela',
 'Vietnam',
 'Vanuatu',
 'Yemen',
 'Zambia',
 'Zimbabwe',
 'Algeria',
 'Bosnia and Herzegovina',
 'Cambodia',
 'Central African Republic',
 'Chad',
 'Comoros',
 'Croatia',
 'East Timor',
 'El Salvador',
 'Equatorial Guinea',
 'Grenada',
 'Kazakhstan',
 'Laos',
 'Federated States of Micronesia',
 'Moldova',
 'Monaco',
 'Montenegro',
 'Morocco',
 'Saint Kitts and Nevis',
 'Saint Lucia',
 'Saint Vincent and the Grenadines',
 'Samoa',
 'Serbia',
 'South Africa',
 'Spain',
 'Sri Lanka',
 'Swaziland',
 'Switzerland',
 'United Arab Emirates',
 'United Kingdom',
]
const sampleTropes = [
  "Arranged Marriage",
  "Enemies to Lovers",
  "Fake Dating",
  "Forbidden Love",
  "Friends to Lovers",
  "Second Chance Romance",
]
const sampleGenres = [
  "Aliens",
  "Alternate/Parallel Universe",
  "Apocalyptic/Post-Apocalyptic",
  "Comedy",
  "Crime",
  "Historical",
  "Hogwarts",
  "Horror",
  "Immortality",
  "Military",
  "Science Fiction",
  "Soulmate",
  "Sports",
  "Spy",
  "Superhero",
  "Thriller",
  "Time Travel",
  "Vampire",
  "Werewolf",
]
const sampleTags = [
  "Fluff",
  "Angst",
  "Fluff and Angst",
]
const sampleEndingTypes = [
  "Happy",
  "Sad",
  "Open",
]

// Define the form schema
const formSchema = z.object({
  character1: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    nickname: z.string().optional(),
    age: z.string().min(1, "Age is required"),
    nationality: z.string().min(1, "Nationality is required"),
    traits: z.array(z.string()).min(1, "At least one trait is required"),
    customNationality: z.string().optional(),
    customTraits: z.array(z.string()).optional(),
  }),
  character2: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    nickname: z.string().optional(),
    age: z.string().min(1, "Age is required"),
    nationality: z.string().min(1, "Nationality is required"),
    traits: z.array(z.string()).min(1, "At least one trait is required"),
    customNationality: z.string().optional(),
    customTraits: z.array(z.string()).optional(),
  }),
  location: z.string().min(1, "Location is required"),
  customLocation: z.string().optional(),
  trope: z.string().min(1, "Trope is required"),
  customTrope: z.string().optional(),
  genre: z.string().min(1, "Genre is required"),
  customGenre: z.string().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  customTags: z.array(z.string()).optional(),
  endingType: z.string().min(1, "Ending type is required"),
})

type FormValues = z.infer<typeof formSchema>

export default function StoryPromptGenerator() {
  const [generatedStory, setGeneratedStory] = useState("")
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [promptText, setPromptText] = useState("")
  const [shouldRandomize, setShouldRandomize] = useState(false);
  const [customOptions, setCustomOptions] = useState({
    nationalities: [] as string[],
    traits: [] as string[],
    locations: [] as string[],
    tropes: [] as string[],
    genres: [] as string[],
    tags: [] as string[],
  })

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      character1: {
        firstName: "",
        lastName: "",
        nickname: "",
        age: "",
        nationality: "",
        traits: [],
        customNationality: "",
        customTraits: [],
      },
      character2: {
        firstName: "",
        lastName: "",
        nickname: "",
        age: "",
        nationality: "",
        traits: [],
        customNationality: "",
        customTraits: [],
      },
      location: "",
      customLocation: "",
      trope: "",
      customTrope: "",
      genre: "",
      customGenre: "",
      tags: [],
      customTags: [],
      endingType: "",
    },
  })

  const addCustomOption = (category: keyof typeof customOptions, value: string) => {
    if (value && !customOptions[category].includes(value)) {
      setCustomOptions((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }))
      return true
    }
    return false
  }

  const randomizeForm = () => {
    const randomFirstName1 = sampleFirstNames[Math.floor(Math.random() * sampleFirstNames.length)]
    const randomLastName1 = sampleLastNames[Math.floor(Math.random() * sampleLastNames.length)]
    const randomNickname1 = randomFirstName1
    const randomAge1 = Math.floor(Math.random() * (45 - 18 + 1)) + 18
    const randomNationality1 = sampleNationalities[Math.floor(Math.random() * sampleNationalities.length)]

    const randomTraitsCount1 = Math.floor(Math.random() * 3) + 2
    const randomTraits1: string[] = []
    for (let i = 0; i < randomTraitsCount1; i++) {
      const trait = sampleTraits[Math.floor(Math.random() * sampleTraits.length)]
      if (!randomTraits1.includes(trait)) {
        randomTraits1.push(trait)
      }
    }

    const randomFirstName2 = sampleFirstNames[Math.floor(Math.random() * sampleFirstNames.length)]
    const randomLastName2 = sampleLastNames[Math.floor(Math.random() * sampleLastNames.length)]
    const randomNickname2 = randomFirstName2
    const randomAge2 = Math.floor(Math.random() * (45 - 18 + 1)) + 18
    const randomNationality2 = sampleNationalities[Math.floor(Math.random() * sampleNationalities.length)]

    const randomTraitsCount2 = Math.floor(Math.random() * 3) + 2
    const randomTraits2: string[] = []
    for (let i = 0; i < randomTraitsCount2; i++) {
      const trait = sampleTraits[Math.floor(Math.random() * sampleTraits.length)]
      if (!randomTraits2.includes(trait)) {
        randomTraits2.push(trait)
      }
    }

    const randomLocation = sampleLocations[Math.floor(Math.random() * sampleLocations.length)]
    const randomTrope = sampleTropes[Math.floor(Math.random() * sampleTropes.length)]
    const randomGenre = sampleGenres[Math.floor(Math.random() * sampleGenres.length)]
    const randomEndingType = sampleEndingTypes[Math.floor(Math.random() * sampleEndingTypes.length)]

    const randomTagsCount = 1
    const randomTags: string[] = []
    for (let i = 0; i < randomTagsCount; i++) {
      const tag = sampleTags[Math.floor(Math.random() * sampleTags.length)]
      if (!randomTags.includes(tag)) {
        randomTags.push(tag)
      }
    }

    form.reset({
      character1: {
        firstName: randomFirstName1,
        lastName: randomLastName1,
        nickname: randomNickname1,
        age: randomAge1.toString(),
        nationality: randomNationality1,
        traits: randomTraits1,
        customNationality: "",
        customTraits: [],
      },
      character2: {
        firstName: randomFirstName2,
        lastName: randomLastName2,
        nickname: randomNickname2,
        age: randomAge2.toString(),
        nationality: randomNationality2,
        traits: randomTraits2,
        customNationality: "",
        customTraits: [],
      },
      location: randomLocation,
      customLocation: "",
      trope: randomTrope,
      customTrope: "",
      genre: randomGenre,
      customGenre: "",
      tags: randomTags,
      customTags: [],
      endingType: randomEndingType,
    })
  }

  useEffect(() => {
    if (shouldRandomize) {
      randomizeForm();
      setShouldRandomize(false);
    }
  }, [shouldRandomize]);

  async function onSubmit(values: FormValues) {
    setIsGenerating(true)
  
    const prompt = `
  Create a compelling story prompt based on the following elements:
  
  CHARACTERS:
  Character 1:
  - Name: ${values.character1.firstName} ${values.character1.lastName}${values.character1.nickname ? ` (${values.character1.nickname})` : ""}
  - Age: ${values.character1.age}
  - Nationality: ${values.character1.nationality}
  - Traits: ${values.character1.traits.join(", ")}
  
  Character 2:
  - Name: ${values.character2.firstName} ${values.character2.lastName}${values.character2.nickname ? ` (${values.character2.nickname})` : ""}
  - Age: ${values.character2.age}
  - Nationality: ${values.character2.nationality}
  - Traits: ${values.character2.traits.join(", ")}
  
  SETTING:
  - Location: ${values.location}
  
  STORY ELEMENTS:
  - Trope: ${values.trope}
  - Genre: ${values.genre}
  - Tags: ${values.tags.join(", ")}
  - Ending Type: ${values.endingType}
  
  The story prompt should be 2-3 paragraphs long and should set up an intriguing narrative that incorporates all these elements.
    `
  
    setPromptText(prompt)
  
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
  
      const data = await res.json()
      setGeneratedStory(data.output || "No story generated.")
    } catch (err) {
      console.error("Error:", err)
      setGeneratedStory("Something went wrong while generating the story.")
    }
  
    setIsGenerating(false)
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-10">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#c82e43]">Prompt & Prejudice</h1>
      <p className="text-center mb-10 text-[#FFFFFF] [text-shadow:0px_1px_2px_rgba(0,0,0,0.2)]">
      A playful AI web app that generates romance story prompts.<br></br>
      Just give us two names, a mood, and a setting — or let the universe decide it for you 💕
      </p>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <Accordion type="single" collapsible defaultValue="character1" className="w-full">
                  <AccordionItem value="character1">
                    <AccordionTrigger className="text-[#c82e43]">Character 1</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="character1.firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character1.lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Smith" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character1.nickname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nickname (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Johnny" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character1.age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input placeholder="30" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character1.nationality"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>Nationality</FormLabel>
                              <div className="flex gap-2">
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a nationality" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[200px]">
                                    {[...sampleNationalities, ...customOptions.nationalities].map((nationality) => (
                                      <SelectItem key={nationality} value={nationality}>
                                        {nationality}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Nationality</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-nationality"
                                          placeholder="Enter custom nationality"
                                          className="col-span-3"
                                          value={form.watch("character1.customNationality")}
                                          onChange={(e) =>
                                            form.setValue("character1.customNationality", e.target.value)
                                          }
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("character1.customNationality")
                                            if (addCustomOption("nationalities", value)) {
                                              form.setValue("character1.nationality", value)
                                              form.setValue("character1.customNationality", "")
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character1.traits"
                          render={() => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <div className="mb-4">
                                <FormLabel className="text-base">Traits</FormLabel>
                                <FormDescription>Select the traits that define this character.</FormDescription>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1">
                                {[...sampleTraits, ...customOptions.traits].map((trait) => (
                                  <FormField
                                    key={trait}
                                    control={form.control}
                                    name="character1.traits"
                                    render={({ field }) => {
                                      return (
                                        <FormItem key={trait} className="flex flex-row items-start space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(trait)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, trait])
                                                  : field.onChange(field.value?.filter((value) => value !== trait))
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">{trait}</FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <div className="mt-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="mt-2">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Add Custom Trait
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Trait</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-trait"
                                          placeholder="Enter custom trait"
                                          className="col-span-3"
                                          value={form.watch("character1.customTraits")?.[0] || ""}
                                          onChange={(e) => form.setValue("character1.customTraits", [e.target.value])}
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("character1.customTraits")?.[0]
                                            if (addCustomOption("traits", value)) {
                                              const currentTraits = form.watch("character1.traits")
                                              form.setValue("character1.traits", [...currentTraits, value])
                                              form.setValue("character1.customTraits", [])
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="character2">
                    <AccordionTrigger className="text-[#c82e43]">Character 2</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="character2.firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Jane" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character2.lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character2.nickname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nickname (Optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Janey" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character2.age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input placeholder="28" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character2.nationality"
                          render={({ field }) => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <FormLabel>Nationality</FormLabel>
                              <div className="flex gap-2">
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a nationality" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[200px]">
                                    {[...sampleNationalities, ...customOptions.nationalities].map((nationality) => (
                                      <SelectItem key={nationality} value={nationality}>
                                        {nationality}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Nationality</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-nationality"
                                          placeholder="Enter custom nationality"
                                          className="col-span-3"
                                          value={form.watch("character2.customNationality")}
                                          onChange={(e) =>
                                            form.setValue("character2.customNationality", e.target.value)
                                          }
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("character2.customNationality")
                                            if (addCustomOption("nationalities", value)) {
                                              form.setValue("character2.nationality", value)
                                              form.setValue("character2.customNationality", "")
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="character2.traits"
                          render={() => (
                            <FormItem className="col-span-1 md:col-span-2">
                              <div className="mb-4">
                                <FormLabel className="text-base">Traits</FormLabel>
                                <FormDescription>Select the traits that define this character.</FormDescription>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1">
                                {[...sampleTraits, ...customOptions.traits].map((trait) => (
                                  <FormField
                                    key={trait}
                                    control={form.control}
                                    name="character2.traits"
                                    render={({ field }) => {
                                      return (
                                        <FormItem key={trait} className="flex flex-row items-start space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(trait)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, trait])
                                                  : field.onChange(field.value?.filter((value) => value !== trait))
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">{trait}</FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <div className="mt-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="mt-2">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Add Custom Trait
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Trait</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-trait"
                                          placeholder="Enter custom trait"
                                          className="col-span-3"
                                          value={form.watch("character2.customTraits")?.[0] || ""}
                                          onChange={(e) => form.setValue("character2.customTraits", [e.target.value])}
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("character2.customTraits")?.[0]
                                            if (addCustomOption("traits", value)) {
                                              const currentTraits = form.watch("character2.traits")
                                              form.setValue("character2.traits", [...currentTraits, value])
                                              form.setValue("character2.customTraits", [])
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="storyElements">
                    <AccordionTrigger className="text-[#c82e43]">Prompt Potion</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 gap-6">
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <div className="flex gap-2">
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a location" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[200px]">
                                    {[...sampleLocations, ...customOptions.locations].map((location) => (
                                      <SelectItem key={location} value={location}>
                                        {location}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Location</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-location"
                                          placeholder="Enter custom location"
                                          className="col-span-3"
                                          value={form.watch("customLocation")}
                                          onChange={(e) => form.setValue("customLocation", e.target.value)}
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("customLocation")
                                            if (addCustomOption("locations", value)) {
                                              form.setValue("location", value)
                                              form.setValue("customLocation", "")
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="trope"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Trope</FormLabel>
                              <div className="flex gap-2">
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a trope" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[200px]">
                                    {[...sampleTropes, ...customOptions.tropes].map((trope) => (
                                      <SelectItem key={trope} value={trope}>
                                        {trope}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Trope</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-trope"
                                          placeholder="Enter custom trope"
                                          className="col-span-3"
                                          value={form.watch("customTrope")}
                                          onChange={(e) => form.setValue("customTrope", e.target.value)}
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("customTrope")
                                            if (addCustomOption("tropes", value)) {
                                              form.setValue("trope", value)
                                              form.setValue("customTrope", "")
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="genre"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Genre</FormLabel>
                              <div className="flex gap-2">
                                <Select onValueChange={field.onChange} value={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a genre" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-[200px]">
                                    {[...sampleGenres, ...customOptions.genres].map((genre) => (
                                      <SelectItem key={genre} value={genre}>
                                        {genre}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="icon">
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Genre</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-genre"
                                          placeholder="Enter custom genre"
                                          className="col-span-3"
                                          value={form.watch("customGenre")}
                                          onChange={(e) => form.setValue("customGenre", e.target.value)}
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("customGenre")
                                            if (addCustomOption("genres", value)) {
                                              form.setValue("genre", value)
                                              form.setValue("customGenre", "")
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="tags"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel className="text-base">Tags</FormLabel>
                                <FormDescription>Select tags for your story.</FormDescription>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-1">
                                {[...sampleTags, ...customOptions.tags].map((tag) => (
                                  <FormField
                                    key={tag}
                                    control={form.control}
                                    name="tags"
                                    render={({ field }) => {
                                      return (
                                        <FormItem key={tag} className="flex flex-row items-start space-x-3 space-y-0">
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(tag)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, tag])
                                                  : field.onChange(field.value?.filter((value) => value !== tag))
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">{tag}</FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <div className="mt-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="mt-2">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Add Custom Tag
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Add Custom Tag</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                      <div className="flex items-center gap-4">
                                        <Input
                                          id="custom-tag"
                                          placeholder="Enter custom tag"
                                          className="col-span-3"
                                          value={form.watch("customTags")?.[0] || ""}
                                          onChange={(e) => form.setValue("customTags", [e.target.value])}
                                        />
                                        <Button
                                          type="button"
                                          onClick={() => {
                                            const value = form.watch("customTags")?.[0]
                                            if (addCustomOption("tags", value)) {
                                              const currentTags = form.watch("tags")
                                              form.setValue("tags", [...currentTags, value])
                                              form.setValue("customTags", [])
                                            }
                                          }}
                                        >
                                          Add
                                        </Button>
                                      </div>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="endingType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ending Type</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select an ending type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {sampleEndingTypes.slice(0, 10).map((endingType) => (
                                    <SelectItem key={endingType} value={endingType}>
                                      {endingType}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="customOutline"
                    onClick={() => setShouldRandomize(true)}
                    className="flex items-center gap-2">
                    <Shuffle className="h-4 w-4" />
                    Randomize Everything
                  </Button>
                </div>

                <Button type="submit" className="w-full"  variant="customHighlight" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Story Prompt
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* {promptText && (
          <Card>
            <CardHeader>
              <CardTitle>LLM Prompt</CardTitle>
              <CardDescription>This is the prompt that would be sent to the LLM</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm">{promptText}</div>
            </CardContent>
          </Card>
        )} */}

        {generatedStory && (
          <Card>
            <CardHeader className="flex flex-row justify-between items-start">
              <div>
                <CardTitle>Generated Story Prompt</CardTitle>
                <CardDescription>Here’s what the LLM came up with</CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(generatedStory)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}>
                {copied ? "Copied ✨" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-base">{generatedStory}</div>
            </CardContent>
          </Card>
        )}


      </div>
    </div>
  )
}
