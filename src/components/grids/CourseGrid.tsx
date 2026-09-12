"use client";

import { CourseCard } from "@/components/cards/CourseCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { courses } from "@/content/courses";

export function CourseGrid() {
  return (
    <RevealGroup
      as="ul"
      stagger={0.1}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
    >
      {courses.map((course) => (
        <Reveal as="li" key={course.slug} variant="settle">
          <CourseCard course={course} />
        </Reveal>
      ))}
    </RevealGroup>
  );
}
