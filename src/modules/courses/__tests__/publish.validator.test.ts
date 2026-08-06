import { describe, it, expect } from 'vitest';
import { CoursePublishValidator } from '../course.publish.validator';

describe('CoursePublishValidator', () => {
  it('should pass if all required fields are present', () => {
    const course: any = {
      title: 'Valid Course',
      description: 'A valid description',
      thumbnailUrl: 'https://example.com/image.jpg',
      academyId: 'some-academy-id',
      modules: [{ title: 'Module 1', topics: [{ title: 'Topic 1' }] }],
    };

    expect(() => CoursePublishValidator.validateForPublishing(course)).not.toThrow();
  });

  it('should fail if title is missing', () => {
    const course: any = {
      description: 'A valid description',
      thumbnailUrl: 'https://example.com/image.jpg',
      academyId: 'some-academy-id',
      modules: [{ title: 'Module 1', topics: [{ title: 'Topic 1' }] }],
    };

    expect(() => CoursePublishValidator.validateForPublishing(course)).toThrow('Course name is required.');
  });

  it('should fail if no modules are present', () => {
    const course: any = {
      title: 'Valid Course',
      description: 'A valid description',
      thumbnailUrl: 'https://example.com/image.jpg',
      academyId: 'some-academy-id',
      modules: [],
    };

    expect(() => CoursePublishValidator.validateForPublishing(course)).toThrow('At least one curriculum module must be added.');
  });

  it('should fail if thumbnail is missing', () => {
    const course: any = {
      title: 'Valid Course',
      description: 'A valid description',
      academyId: 'some-academy-id',
      modules: [{ title: 'Module 1', topics: [{ title: 'Topic 1' }] }],
    };

    expect(() => CoursePublishValidator.validateForPublishing(course)).toThrow('A course thumbnail or banner image is required.');
  });
});
