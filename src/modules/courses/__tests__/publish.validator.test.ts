import { CoursePublishValidator } from '../publish.validator';

describe('CoursePublishValidator', () => {
  it('should pass if all required fields are present', () => {
    const course: any = {
      title: 'Valid Course',
      description: 'A valid description',
      thumbnailUrl: 'https://example.com/image.jpg',
      academyId: 'some-academy-id',
      modules: [
        {
          title: 'Module 1',
          topics: [{ title: 'Topic 1' }],
        },
      ],
    };

    const result = CoursePublishValidator.validateForPublish(course);
    expect(result.isValid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should fail if title is missing', () => {
    const course: any = {
      description: 'A valid description',
      thumbnailUrl: 'https://example.com/image.jpg',
      academyId: 'some-academy-id',
      modules: [{ title: 'Module 1', topics: [{ title: 'Topic 1' }] }],
    };

    const result = CoursePublishValidator.validateForPublish(course);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Course title is required');
  });

  it('should fail if no modules are present', () => {
    const course: any = {
      title: 'Valid Course',
      description: 'A valid description',
      thumbnailUrl: 'https://example.com/image.jpg',
      academyId: 'some-academy-id',
      modules: [],
    };

    const result = CoursePublishValidator.validateForPublish(course);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Course must have at least one module in the curriculum');
  });

  it('should fail if thumbnail is missing', () => {
    const course: any = {
      title: 'Valid Course',
      description: 'A valid description',
      academyId: 'some-academy-id',
      modules: [{ title: 'Module 1', topics: [{ title: 'Topic 1' }] }],
    };

    const result = CoursePublishValidator.validateForPublish(course);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Course thumbnail is required');
  });
});
