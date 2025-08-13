"use client";

import { Fragment } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "@stackk/ui/card";
import { TabsContent } from "@stackk/ui/tabs";

const defaultTeams = [
  {
    name: "Consulta externa",
    label: "external-consult",
  },
  {
    name: "Enfermería",
    label: "infirmary",
  },
  {
    name: "Centro quirúrgico",
    label: "surgery-center",
  },
  {
    name: "Obstetricia",
    label: "obstetrics",
  },
  {
    name: "UCI",
    label: "uci",
  },
  // Add more teams as needed
];

export const TeamInvites = () => {
  return (
    <Fragment>
      {defaultTeams.map((team) => (
        <TabsContent key={team.label} value={team.label}>
          <Card key={team.label}>
            <CardHeader>
              <CardTitle className="font-medium">{team.name}</CardTitle>
              <CardDescription>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      ))}
    </Fragment>
  );
};
