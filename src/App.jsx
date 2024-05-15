import { useEffect, useState } from "react";
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import { Random } from "./Random";
import { number } from "zod";
import { Checkbox } from "./components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function App() {
  const [landlocked, setLandlocked] = useState(false);
  const [borders, setBorders] = useState(1);
  const [cons, setCons] = useState([
    "Slovenija",
    "Francija",
    "Nemčija",
    "Italija",
  ]);
  const [fact, setFact] = useState({});

  async function getRandomFact() {
    const response = await fetch("http://numbersapi.com/random?json");
    const data = await response.json();
    setFact(data);
  }
  const [factM, setFactM] = useState({});

  async function getRandomFactM() {
    const response = await fetch("http://numbersapi.com/random/math?json");
    const data = await response.json();
    setFactM(data);
  }
  const [coun, setCoun] = useState([]);

  const [region, setRegion] = useState("all");

  async function getCountries() {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,flag,borders,region,flags,landlocked",
    );
    const data = await response.json();
    setCoun(data);
  }

  useEffect(() => {
    getRandomFact();
    getRandomFactM();
    getCountries();
  }, []);

  return (
    <>
      <div className="container space-y-10">
        <div className="flex">
          <Card className="m-5 w-[350px] p-5">
            <CardTitle className="m-2 text-2xl">
              <h1>Izbira Regije</h1>
            </CardTitle>
            <Select onValueChange={(value) => setRegion(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Vse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Vse</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Americas">Americas</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
              </SelectContent>
            </Select>
          </Card>{" "}
          <Card className="m-5 w-[350px] p-5">
            <CardTitle className="m-2 text-2xl">Države brez Morja</CardTitle>
            <CardContent>
              <Checkbox
                checked={landlocked}
                onCheckedChange={(value) => setLandlocked(value)}
              ></Checkbox>
            </CardContent>
          </Card>
          <Card className="m-5 w-[350px] p-5">
            <CardTitle className="m-2 text-2xl">
              Število sosednih držav : {borders}
            </CardTitle>
            <CardContent>
              <Slider
                defaultValue={[3]}
                max={[10]}
                step={[1]}
                onValueChange={(value) => setBorders(value)}
              ></Slider>
              <CardDescription></CardDescription>
            </CardContent>
          </Card>
        </div>
        <Carousel>
          <CarouselContent>
            {coun
              .filter((con) => region == "all" || con.region == region)
              .filter((con) => con.landlocked == landlocked)
              .filter((con) => borders == con.borders.length)
              .map((con) => (
                <CarouselItem className="basis-1/3" key={con.name.common}>
                  <Card className="m-5 p-5">
                    <CardTitle className="m-2 text-2xl">
                      {con.name.common}

                      {con.flag}
                    </CardTitle>
                    <CardContent>
                      <img src={con.flags.png}></img>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious></CarouselPrevious>
          <CarouselNext></CarouselNext>
        </Carousel>
      </div>
    </>
  );
}
