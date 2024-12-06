import { apiSlice } from "@/redux/features/api/apiSlice";


export const courseApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: "create-course",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: "get-admin-courses",
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getLecturerAllCourses: builder.query({
            query: () => ({
                url: `get-lecturer-courses/`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            }),
        }),
        editCourse: builder.mutation({
            query: ({ id, data }) => ({
                url: `/edit-course/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const,
            }),
        }),
        getAllUsersCourses: builder.query({
            query: () => ({
                url: `/get-courses/`,
                method: "GET",
            }),
        }),
        getUserCourseDetail: builder.query({
            query: ({ id }) => ({
                url: `/get-course/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        getUserCourseContent: builder.query({
            query: ({ id }) => ({
                url: `/get-course-content/${id}`,
                method: "GET",
                credentials: "include" as const,
            }),
        }),
        addNewQuestion: builder.mutation({
            query: ({question, courseId, contentId}) => ({
                url: "add-question",
                method: "POST",
                body: {question, courseId, contentId},
                credentials: "include" as const,
            }),
        }),
        addNewAnswer: builder.mutation({
            query: ({answer, courseId, contentId,questionId}) => ({
                url: "add-answer",
                method: "PUT",
                body: {answer, courseId, contentId,questionId},
                credentials: "include" as const,
            }),
        }),
        addNewReview: builder.mutation({
            query: ({review,rating,courseId}) => ({
                url: `add-review/${courseId}`,
                method: "PUT",
                body: {review,rating},
                credentials: "include" as const,
            }),
        }),
        addNewReviewReply: builder.mutation({
            query: ({comment, courseId, reviewId}) => ({
                url: `add-review-reply`,
                method: "PUT",
                body: {comment, courseId, reviewId},
                credentials: "include" as const,
            }),
        }),
        updateProgress: builder.mutation({
            query: ({ userId, courseId, progress }) => ({
                url: `/update-progress`,
                method: "PUT",
                body: {userId, courseId, progress},
                credentials: "include" as const,
            }),
        }),
        submitEssayAnswer: builder.mutation({
            query: ({ courseId, courseDataId, essayAnswers }) => ({
                url: "submit-essay-answer",
                method: "POST",
                body: { courseId, courseDataId, essayAnswers },
                credentials: "include" as const,
            }),
        }),

        getEssayAnswer: builder.mutation({
            query: ({ courseId, courseDataId, user }) => ({
                url: "get-essay-answer",
                method: "GET",
                body: { courseId, courseDataId, user },
                credentials: "include" as const,
            }),
        }),
        deleteEssayAnswer: builder.mutation({
            query: ({ courseId, courseDataId, user }) => ({
                url: "delete-essay-answer",
                method: "DELETE",
                body: { courseId, courseDataId, user },
                credentials: "include" as const,
            }),
        }),
    })
})

export const {
    useCreateCourseMutation,
    useGetAllCoursesQuery,
    useDeleteCourseMutation,
    useEditCourseMutation,
    useGetAllUsersCoursesQuery,
    useGetLecturerAllCoursesQuery,
    useGetUserCourseDetailQuery,
    useGetUserCourseContentQuery,
    useAddNewQuestionMutation,
    useAddNewAnswerMutation,
    useAddNewReviewMutation,
    useAddNewReviewReplyMutation,
    useUpdateProgressMutation,
    useSubmitEssayAnswerMutation,
} = courseApi;