import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import { Usecase, getUsecaseFromUsername } from "@/auth";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUserInfo } from "@/hooks/use-user-info";

interface CardContent {
  title: string;
  description: string;
  trend: string;
  trendUp: boolean;
  subtitle: string;
  footer: string;
}

const usecaseCards: Record<Usecase, CardContent[]> = {
  [Usecase.Logistics]: [
    {
      title: "23,487",
      description: "Shipments Delivered",
      trend: "+5.2%",
      trendUp: true,
      subtitle: "Successfully delivered in the last 30 days",
      footer: "Trending up this month",
    },
    {
      title: "182",
      description: "Delayed Shipments",
      trend: "-12.3%",
      trendUp: false,
      subtitle: "Shipments arriving >24 hrs later than expected",
      footer: "Down from last month",
    },
    {
      title: "14",
      description: "Active Warehouses",
      trend: "+2",
      trendUp: true,
      subtitle: "Currently syncing inventory and fulfillment data",
      footer: "New locations added",
    },
    {
      title: "97.3%",
      description: "On-Time Delivery Rate",
      trend: "+1.2%",
      trendUp: true,
      subtitle: "Performance benchmarked across all routes",
      footer: "Exceeding targets",
    },
  ],
  [Usecase.Fintech]: [
    {
      title: "$58.5M",
      description: "Total Transactions",
      trend: "+15.3%",
      trendUp: true,
      subtitle: "Processed across all customer accounts this month",
      footer: "Strong transaction growth",
    },
    {
      title: "612",
      description: "Chargebacks Initiated",
      trend: "-8.2%",
      trendUp: false,
      subtitle: "Under review or in progress",
      footer: "Improved fraud detection",
    },
    {
      title: "32,241",
      description: "Active Accounts",
      trend: "+12.5%",
      trendUp: true,
      subtitle: "Engaged in at least 1 transaction in the past week",
      footer: "Growing user base",
    },
    {
      title: "+11.4%",
      description: "Revenue Growth",
      trend: "+11.4%",
      trendUp: true,
      subtitle: "Net new monthly revenue across all channels",
      footer: "MoM growth rate",
    },
  ],
  [Usecase.Ai]: [
    {
      title: "23.4M",
      description: "Model Inferences",
      trend: "+18.2%",
      trendUp: true,
      subtitle: "Predictions served in the last 30 days",
      footer: "Increasing model usage",
    },
    {
      title: "51",
      description: "New Datasets Ingested",
      trend: "+12",
      trendUp: true,
      subtitle: "Training sets uploaded or synced via API",
      footer: "Growing data pipeline",
    },
    {
      title: "187",
      description: "Active Pipelines",
      trend: "+23",
      trendUp: true,
      subtitle: "Currently running or scheduled for execution",
      footer: "Pipeline expansion",
    },
    {
      title: "+3.1%",
      description: "Accuracy Uplift",
      trend: "+3.1%",
      trendUp: true,
      subtitle: "Improvement across production models",
      footer: "QoQ improvement",
    },
  ],
  [Usecase.Devtools]: [
    {
      title: "37",
      description: "Incidents Resolved",
      trend: "-15%",
      trendUp: false,
      subtitle: "Number of major incidents closed out in the past month",
      footer: "Improved stability",
    },
    {
      title: "1h 42m",
      description: "Mean Time to Resolution",
      trend: "-25m",
      trendUp: false,
      subtitle: "Average time taken from incident creation to resolution",
      footer: "Faster response times",
    },
    {
      title: "14",
      description: "On-Call Handoffs",
      trend: "-3",
      trendUp: false,
      subtitle: "Recent transitions between on-call engineers in the past week",
      footer: "Reduced handoffs",
    },
    {
      title: "5",
      description: "Open Postmortems",
      trend: "-2",
      trendUp: false,
      subtitle: "Number of incidents still pending a completed retrospective",
      footer: "Active investigations",
    },
  ],
  [Usecase.Gtm]: [
    {
      title: "$1,250.00",
      description: "Total Revenue",
      trend: "+12.5%",
      trendUp: true,
      subtitle: "Visitors for the last 6 months",
      footer: "Trending up this month",
    },
    {
      title: "1,234",
      description: "New Customers",
      trend: "+20%",
      trendUp: true,
      subtitle: "Strong acquisition performance",
      footer: "Up 20% this period",
    },
    {
      title: "45,678",
      description: "Active Accounts",
      trend: "+12.5%",
      trendUp: true,
      subtitle: "Engagement exceed targets",
      footer: "Strong user retention",
    },
    {
      title: "4.5%",
      description: "Growth Rate",
      trend: "+4.5%",
      trendUp: true,
      subtitle: "Meets growth projections",
      footer: "Steady performance increase",
    },
  ],
};

export function SectionCards() {
  const { username } = useUserInfo();
  const usecase = getUsecaseFromUsername(username);
  const cards = usecaseCards[usecase] ?? usecaseCards[Usecase.Gtm];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.title}
            </CardTitle>
            <CardAction>
              <Badge variant="outline">
                {card.trendUp ? <IconTrendingUp /> : <IconTrendingDown />}
                {card.trend}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.footer}{" "}
              {card.trendUp ? (
                <IconTrendingUp className="size-4" />
              ) : (
                <IconTrendingDown className="size-4" />
              )}
            </div>
            <div className="text-muted-foreground">{card.subtitle}</div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
