import { z } from "zod/v4";

export const NewSpaceSchema = z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.string().optional(),
});

export const defaultTeams = [
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
];
